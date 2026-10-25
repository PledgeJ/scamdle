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




def addTexts(db: Session):
    DAILYIMAGE = {
    1: Sms(smsid = 1, dayid = "2026-10-24", isscam = True, reasonone =  "Urgency", reasontwo = "Vague", smsmessage = "Please help me Grandma! I urgently need £3000 to get home from Nottingham. Please can you directly pay for my transport using this link? flixbuz.com/pu73B5" ),
    2: Sms(smsid = 2, dayid = "2026-10-24", isscam = False, reasonone =  "Asked to Phone Call", smsmessage = "Hi Grandpa. I lost some money in an embarassing way and I need money for food. Can I call you to talk about it?" ),
    3: Sms(smsid = 3, dayid = "2026-10-24", isscam = True, reasonone =  "Asking for secrecy", reasontwo = "Strange Payment Method", smsmessage = "Hi Grandma, I'm in trouble - I got arrested and need £5000 for a lawyer. Please don't tell Mom and Dad. I'm so embarassed. Please send an e-Transfer to johnsmith@gmail.com" ),
    4: Sms(smsid = 4, dayid = "2026-10-25", isscam = False, reasonone =  "Asked to Phone Call", smsmessage = "Hi Grandpa. I lost some money in an embarassing way and I need money for food. Can I call you to talk about it?" ),
    5: Sms(smsid = 5, dayid = "2026-10-25", isscam = True, reasonone =  "Urgency", smsmessage = "Help me Grandma! I was mugged yesterday and I don't have money for food! Please can you send me your card details and pin number before I go hungry"),
    6: Sms(smsid = 6, dayid = "2026-10-25", isscam = True, reasonone =  "Shady Link", reasontwo = "Urgency", smsmessage = "Post-Office: Your parcel has been redirected to your local branch due to an unpaid shipping fee. To reschedule visit http://mypackage-redelivery.com"),
}
    for item in DAILYIMAGE:
        db.add(DAILYIMAGE[item])
    db.commit()

def uploadTexts(db: Session, date: str):
    if db.query(Sms).count() == 0: addTexts(db)
    texts = db.scalars(select(Sms).where(Sms.dayid == date)).all()
    print(texts)
    out = []
    for item in texts: 
        out.append({
            "isScam" : item.isscam, 
            "msg" : item.smsmessage, 
            "reason1" : item.reasonone, 
            "reason2" : item.reasontwo
        }) 
    return out 



