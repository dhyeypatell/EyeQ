from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from zoneinfo import ZoneInfo
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

ENV = os.getenv("ENV", "dev")
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = f"inkling-{ENV}"

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db["messages"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_timestamp():
    toronto_time = datetime.now(ZoneInfo("America/Toronto"))
    timestamp = toronto_time.strftime("%Y-%m-%d %I:%M:%S %p %Z")
    return timestamp


@app.post("/api/user-messages")
async def post_user_message(request: Request):
    data = await request.json()
    payload = {
        "type": data.get("type"),
        "userMessage": data.get("userMessage"),
        "timestamp": data.get("timestamp", get_timestamp()),
    }

    try:
        collection.insert_one(payload)
    except Exception:
        raise HTTPException(
            status_code=500, detail="Failed to insert document into the database"
        )


@app.get("/api/user-messages")
async def get_user_messages():
    try:
        cursor = collection.find({"type": "user"})
    except Exception:
        raise HTTPException(
            status_code=500, detail="Failed to retrieve user messages from the database"
        )

    userMessages = []

    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        userMessages.append(doc)

    return {"messages": userMessages}
