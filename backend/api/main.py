from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from zoneinfo import ZoneInfo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

user_messages = []


def get_timestamp():
    toronto_time = datetime.now(ZoneInfo("America/Toronto"))
    timestamp = toronto_time.strftime("%Y-%m-%d %I:%M:%S %p %Z")
    return timestamp


@app.post("/api/user-messages")
async def post_user_message(request: Request):
    data = await request.json()
    payload = {
        "userMessage": data.get("userMessage"),
        "timestamp": data.get("timestamp", get_timestamp()),
    }
    user_messages.append(payload)
    return payload


@app.get("/api/user-messages")
async def get_user_messages():
    return {"userMessages": user_messages}
