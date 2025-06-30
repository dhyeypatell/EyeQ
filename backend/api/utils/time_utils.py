from datetime import datetime
from zoneinfo import ZoneInfo


def get_timestamp():
    toronto_time = datetime.now(ZoneInfo("America/Toronto"))
    timestamp = toronto_time.strftime("%Y-%m-%d %I:%M:%S %p %Z")
    return timestamp
