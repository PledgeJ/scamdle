# This sms game is designed to help combat the GrandParent scam

from pydantic import BaseModel
from schema.models import Sms
from sqlalchemy.orm import Session 
from sqlalchemy import select

class scamImage(BaseModel):
    id: int
    dayID: str
    isScam: bool
    reason1: str 
    reason2: str | None = None
    message: str


DAILYIMAGE = {
    1: scamImage(id = 1, dayID = "2026-10-25", isScam = True, reason1 =  "Urgency", reason2 = "Vague", message = "Please help me Grandma! I urgently need £3000 to get home from Nottingham. Please can you directly pay for my transport using this link? flixbuz.com/pu73B5" ),
    2: scamImage(id = 2, dayID = "2026-10-25", isScam = False, reason1 =  "Asked to Phone Call", message = "Hi Grandpa. I lost some money in an embarassing way and I need money for food. Can I call you to talk about it?" ),
    3: scamImage(id = 3, dayID = "2026-10-25", isScam = True, reason1 =  "Asking for secrecy", reason2 = "Strange Payment Method", message = "Hi Grandma, I'm in trouble - I got arrested and need £5000 for a lawyer. Please don't tell Mom and Dad. I'm so embarassed. Please send an e-Transfer to johnsmith@gmail.com" ),
    4: scamImage(id = 4, dayID = "2026-10-26", isScam = True, reason1 =  "Strange Payment Method", message = "images/scam1.webp"),
    5: scamImage(id = 5, dayID = "2026-10-26", isScam = True, reason1 =  "Urgency", message = "Help me Grandma! I was mugged yesterday and I don't have money for food! Please can you send me your card details and pin number before I go hungry"),
    6: scamImage(id = 6, dayID = "2026-10-26", isScam = True, reason1 =  "Requesting Secrecy", message = "images/scam1.webp"),
}

def addTexts(db: Session):
    for item in DAILYIMAGE:
        db.add(DAILYIMAGE[item])
    db.commit()


def uploadText(db: Session, date: str):
    if db.query(Sms).count() == 0: addTexts(db)
    texts = db.scalars(select(Sms.reason1, Sms.reason2, Sms.isscam, Sms.msg).where(Sms.dayid == date))
    return texts



def uploadImagesfda(date:str):
    images = []
    for item in DAILYIMAGE:
        if date == DAILYIMAGE[item].dayID:
            images.append({
                "reason1" : DAILYIMAGE[item].reason1, 
                "reason2" : DAILYIMAGE[item].reason2,  
                "isScam" : DAILYIMAGE[item].isScam,
                "msg": DAILYIMAGE[item].message}
                )
    return images







