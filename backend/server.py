import asyncio
import ipaddress
import logging
import os
import re
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# from lib.db import client, db, ensure_indexes

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = os.environ["EMAIL_BASE_URL"]
EMAIL_KEY = os.environ["EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     app.state.index_task = asyncio.create_task(ensure_indexes())
#     yield
#     client.close()

# lifespan=lifespan

app = FastAPI()
api_router = APIRouter(prefix="/api")


_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from": EMAIL_FROM_NAME}
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {EMAIL_KEY}"},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=60)
    room: Optional[str] = Field(default=None, max_length=40)
    date_from: Optional[str] = Field(default=None, max_length=20)
    date_to: Optional[str] = Field(default=None, max_length=20)
    guests: Optional[int] = Field(default=None, ge=1, le=20)
    message: str = Field(min_length=1, max_length=4000)


class Inquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    room: Optional[str] = None
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    guests: Optional[int] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InquiryResponse(BaseModel):
    status: str
    id: str


@api_router.get("/")
async def root():
    return {"message": "Haus Winter API"}


@api_router.post("/inquiries", response_model=InquiryResponse)
async def create_inquiry(input: InquiryCreate):
    inquiry = Inquiry(**input.model_dump())
    doc = inquiry.model_dump()
    # await db.inquiries.insert_one(doc)

    def row(label: str, value: Optional[str]) -> str:
        if not value:
            return ""
        return (f'<tr><td style="padding:6px 16px 6px 0;color:#686156;font-size:13px;'
                f'vertical-align:top;white-space:nowrap">{label}</td>'
                f'<td style="padding:6px 0;font-size:14px;color:#1F1D1A">{escape(value)}</td></tr>')

    room_labels = {"single": "Einzelzimmer", "double": "Doppelzimmer",
                   "triple": "Dreibettzimmer", "any": "Noch offen / Beratung"}
    period = ""
    if inquiry.date_from or inquiry.date_to:
        period = f'{inquiry.date_from or "?"} bis {inquiry.date_to or "?"}'

    rows = "".join([
        row("Name", inquiry.name),
        row("E-Mail", inquiry.email),
        row("Telefon", inquiry.phone),
        row("Zimmer", room_labels.get(inquiry.room or "", inquiry.room)),
        row("Zeitraum", period),
        row("Personen", str(inquiry.guests) if inquiry.guests else None),
    ])
    html = (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td '
        'style="padding:24px;font-family:Arial,sans-serif;background:#FAF7F2">'
        f'<p style="font-size:18px;font-weight:bold;color:#1F1D1A;margin:0 0 4px">'
        f'Neue Zimmeranfrage &uuml;ber die Website</p>'
        f'<p style="font-size:13px;color:#C45B28;margin:0 0 16px">{escape(EMAIL_FROM_NAME)} &middot; Kuppenstra&szlig;e 38, 36275 Kirchheim</p>'
        f'<table role="presentation" cellpadding="0" cellspacing="0">{rows}</table>'
        f'<p style="font-size:13px;color:#686156;margin:16px 0 4px">Nachricht</p>'
        f'<p style="font-size:14px;color:#1F1D1A;background:#FFFFFF;border:1px solid #E5DEC9;'
        f'border-radius:8px;padding:12px">{escape(inquiry.message)}</p>'
        f'<p style="font-size:12px;color:#A8A29E;margin:16px 0 0">Gesendet vom Kontaktformular '
        f'der {escape(EMAIL_FROM_NAME)}-Website. Bitte antworten Sie direkt an die angegebene E-Mail-Adresse.</p>'
        '</td></tr></table>'
    )
    await send_email(to=OWNER_EMAIL, subject=f"Neue Zimmeranfrage von {escape(inquiry.name)}", html=html)
    return InquiryResponse(status="success", id=inquiry.id)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
