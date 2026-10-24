# This sms game is designed to help combat the GrandParent scam

from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
import base64

class scamImage(BaseModel):
    id: int
    dayID: str
    isScam: bool
    reason1: str 
    reason2: str | None = None
    message: str


DAILYIMAGE = {
    1: scamImage(id = 1, dayID = "2026-10-24", isScam = True, reason1 =  "Urgency", reason2 = "Vague", message = "images/scam1.webp" ),
    2: scamImage(id = 2, dayID = "2026-10-24", isScam = False, reason1 =  "Detailed", reason2 = "Asked to Call", message = "images/scam2.png" ),
    3: scamImage(id = 3, dayID = "2026-10-24", isScam = True, reason1 =  "Public Details", message = "images/scam1.webp" ),
    4: scamImage(id = 4, dayID = "2026-10-25", isScam = True, reason1 =  "Strange Payment Method", imagePath = "images/scam1.webp"),
    5: scamImage(id = 5, dayID = "2026-10-25", isScam = True, reason1 =  "Requesting Secrecy", imagePath = "images/scam1.webp"),
    6: scamImage(id = 6, dayID = "2026-10-25", isScam = True, reason1 =  "Requesting Secrecy", imagePath = "images/scam1.webp"),
}



def uploadImages(date:str):
    images = []
    for item in DAILYIMAGE:
        if date == DAILYIMAGE[item].dayID:
            images.append({
                "reason1" : DAILYIMAGE[item].reason1, 
                "reason2" :DAILYIMAGE[item].reason2,  
                "isScam" : DAILYIMAGE[item].isScam,
                "imgMsg": DAILYIMAGE[item].message}
                )
    return images





