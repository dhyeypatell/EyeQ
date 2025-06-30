from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from utils.time_utils import get_timestamp
import utils.constants as C
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
    allow_origins=C.ALLOWED_ORIGINS,
    allow_methods=C.ALLOWED_METHODS,
    allow_headers=C.ALLOWED_HEADERS,
)


@app.post(C.ROUTE_USER_MESSAGES)
async def post_user_message(request: Request):
    data = await request.json()
    payload = {
        C.KEY_TYPE: data.get(C.KEY_TYPE),
        C.KEY_USER_MESSAGE: data.get(C.KEY_USER_MESSAGE),
        C.KEY_TIMESTAMP: data.get(C.KEY_TIMESTAMP, get_timestamp()),
    }

    try:
        collection.insert_one(payload)
    except Exception:
        raise HTTPException(status_code=500, detail=C.ERROR_DOC_INSERT)


@app.get(C.ROUTE_USER_MESSAGES)
async def get_user_messages():
    try:
        cursor = collection.find({C.KEY_TYPE: C.SENDER_USER})
    except Exception:
        raise HTTPException(status_code=500, detail=C.ERROR_DOC_FIND)

    userMessages = []

    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        userMessages.append(doc)

    return {"userMessages": userMessages}
