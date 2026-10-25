# This sms game is designed to help combat the GrandParent scam

from pydantic import BaseModel
from datetime import datetime, timedelta
from sqlalchemy.orm import Session 
from sqlalchemy import select
import schema.models
import random

class scam(BaseModel):
    date : str
    name : str
    desc : str
    unexpected : bool
    urgency : bool
    impersonation : bool
    unusualpayment : bool
    toogood : bool

class scamDay(BaseModel):
    scamid : int
    date : str



def ensureTableExists(db: Session):
    if db.query(schema.models.Scamdle).count() == 0:
            addScams(db)


def addScams(db: Session):
    SCAMS = {
    1 : schema.models.Scamdle(thedate = "2026-10-25", scamname = "Payment scams", scamdesc = "Someone urges you to make a purchase with a promise of compensation, offers to make a payment for you, or gives you bank details to make a payment with.",
             unexpected = True, urgency = True, impersonation = False, unusualpayment = True, toogood = True),

    2 : schema.models.Scamdle(thedate = "2026-10-26", scamname = "Tech support scams", scamdesc = "Someone posing as tech support claims your computer has malware and asks for payment or remote access to fix it.",
             unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    3 : schema.models.Scamdle(thedate = "2026-10-27", scamname = "Employment scams", scamdesc = "A fake job opportunity where someone claims to have overpaid you, promises to reimburse you for equipment, or asks you to send equipment to an IT department.",
             unexpected = True, urgency = False, impersonation = False, unusualpayment = True, toogood = True),

    4 : schema.models.Scamdle(thedate = "2026-10-28", scamname = "Impersonation scams", scamdesc = "Scammers pose as a legitimate company to request personal information, a payment transfer or remote access to your device, sometimes using a fake caller ID to look genuine.",
             unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    5 : schema.models.Scamdle(thedate = "2026-10-29", scamname = "Fake rental", scamdesc = "Scammers relist a house that is genuinely for sale as a rental on a fake website, then take your deposit while pretending to be the landlord.",
             unexpected = False, urgency = False, impersonation = True, unusualpayment = True, toogood = False),

    6 : schema.models.Scamdle(thedate = "2026-10-30", scamname = "QR code scams", scamdesc = "Scammers use third-party QR code scanner apps, or the ads inside them, to send you to fake or malicious websites that steal your personal information.",
             unexpected = False, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    7 : schema.models.Scamdle(thedate = "2026-10-31", scamname = "Fake websites", scamdesc = "Scammers create genuine-looking websites with real-looking phone numbers that show up in search results. When you call, they try to get your sign-in details or other information.",
             unexpected = False, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    8 : schema.models.Scamdle(thedate = "2026-11-01", scamname = "Overpayment scams", scamdesc = "A buyer overpays for something you're selling with a bad check, then asks you to send back the difference by wire transfer or gift card.",
             unexpected = True, urgency = True, impersonation = False, unusualpayment = True, toogood = False),

    9 : schema.models.Scamdle(thedate = "2026-11-02", scamname = "Check cashing", scamdesc = "A stranger outside a bank asks you to cash a check for them, claiming they have no account or forgot their ID. When the check bounces, the loss falls on your account.",
             unexpected = True, urgency = True, impersonation = False, unusualpayment = True, toogood = False),

    10 : schema.models.Scamdle(thedate = "2026-11-03", scamname = "Romance scams", scamdesc = "A new partner you have only ever met online asks you for financial support.",
              unexpected = True, urgency = False, impersonation = True, unusualpayment = True, toogood = False),

    11 : schema.models.Scamdle(thedate = "2026-11-04", scamname = "Charity scams", scamdesc = "You are asked to donate to a charity you have never heard of and cannot find an official website for.",
              unexpected = True, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    12 : schema.models.Scamdle(thedate = "2026-11-05", scamname = "Debt relief", scamdesc = "You are asked to pay upfront for a service that promises to settle or get rid of your debt.",
              unexpected = True, urgency = False, impersonation = False, unusualpayment = False, toogood = True),

    13 : schema.models.Scamdle(thedate = "2026-11-06", scamname = "FTC / IRS scams", scamdesc = "Scammers pretend to be tax officials and call, email or text to claim you owe tax or there is a problem with your tax return. They often fake their caller ID to look official.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    14 : schema.models.Scamdle(thedate = "2026-11-07", scamname = "Investment scams", scamdesc = "You are offered a business opportunity that promises high returns or a way to get rich quickly.",
              unexpected = True, urgency = False, impersonation = False, unusualpayment = False, toogood = True),

    15 : schema.models.Scamdle(thedate = "2026-11-08", scamname = "Lottery scams", scamdesc = "You are asked to pay fees or taxes upfront to claim a large prize you supposedly won.",
              unexpected = True, urgency = False, impersonation = False, unusualpayment = True, toogood = True),

    16 : schema.models.Scamdle(thedate = "2026-11-09", scamname = "Grandparent scam", scamdesc = "Someone claiming to be a grandchild or loved one calls or texts asking for money for an emergency, with instructions on where to send it.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    17 : schema.models.Scamdle(thedate = "2026-11-10", scamname = "Puppy scam", scamdesc = "Scammers post fake litters online or pose as real breeders, taking payment for puppies that do not exist.",
              unexpected = False, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    18 : schema.models.Scamdle(thedate = "2026-11-11", scamname = "Online Merchant/Marketplace Scams", scamdesc = "Buyers or sellers on online marketplaces offer items at prices too good to be true, 'accidentally' overpay you, ask for personal information or send you to suspicious links.",
              unexpected = False, urgency = False, impersonation = False, unusualpayment = True, toogood = True),

    19 : schema.models.Scamdle(thedate = "2026-11-12", scamname = "Mortgage closing", scamdesc = "A message that looks like it is from your estate agent claims there is a last-minute change to the payment details and tells you to send your closing costs to a different account.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    20 : schema.models.Scamdle(thedate = "2026-11-13", scamname = "Business email compromise scams", scamdesc = "An email that appears to come from a familiar supplier asks you to send payment to a different account, but it is from a fraudster who has broken into the supplier's systems.",
              unexpected = True, urgency = False, impersonation = True, unusualpayment = True, toogood = False),

    21 : schema.models.Scamdle(thedate = "2026-11-14", scamname = "Compromised card scam", scamdesc = "Scammers posing as your bank say your card has been compromised and send someone to collect it to 'secure' your account, then use the card to steal your money.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),
    }

    for scamid in SCAMS:
        db.add(SCAMS[scamid])
    db.commit()

def getScamOfTheDay(db: Session, currentDay: str):
    ensureTableExists(db)
    return (db.scalars(select(schema.models.Scamdle).where(schema.models.Scamdle.thedate == currentDay)).first()) 

def getScamFromName(db: Session, givenGuess: str):
    ensureTableExists(db)
    return (db.scalars(select(schema.models.Scamdle).where(schema.models.Scamdle.scamname == givenGuess)).first())