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
    1 : schema.models.Scamdle(thedate = "2026-10-25", scamname = "Payment scams", scamdesc = "Be wary if you are urged to make a purchase with the promise of compensation, or if someone offers to make a payment for you, or provides you with bank account info with which to make a payment. If something sounds too good to be true, it probably is. If you use a payment method you are not familiar with, you run the risk of ultimately being held responsible for the amount paid.",
             unexpected = True, urgency = True, impersonation = False, unusualpayment = True, toogood = True),

    2 : schema.models.Scamdle(thedate = "2026-10-26", scamname = "Tech support scams", scamdesc = "Tech support claims your computer has malware and requests payment to fix the defects or access your computer.",
             unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    3 : schema.models.Scamdle(thedate = "2026-10-27", scamname = "Employment scams", scamdesc = "Be vigilant in validating employment opportunities, especially when exclusively online or working from home. Be suspicious if someone claims to have overpaid you for a job, promises to reimburse for equipment, or asks you to send equipment to an IT dept. The equipment may never be returned, and reimbursements or overpayments may be illegitimate, leaving you liable for the funds. Never divulge personal information online to an unreliable source or through deceptive job",
             unexpected = True, urgency = False, impersonation = False, unusualpayment = True, toogood = True),

    4 : schema.models.Scamdle(thedate = "2026-10-28", scamname = "Impersonation scams", scamdesc = "Scammers pose as a legitimate company (like Capital One) or a utility company and request personal information or a payment transfer in order to make things 'right' on your account. They might also use a fake caller ID that could show up as a legit company's number and/ or request remote access to your device. Scammer posing as a utility company might warn you to pay your balance within a limited time or else the utility will be shut off,",
             unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    5 : schema.models.Scamdle(thedate = "2026-10-29", scamname = "Fake rental", scamdesc = "A house is legitimately listed for sale online, but scammers have set up a fake website and listed the house as a rental. You send your first month’s deposit to a scammer pretending to be the landlord/owner.",
             unexpected = False, urgency = False, impersonation = True, unusualpayment = True, toogood = False),

    6 : schema.models.Scamdle(thedate = "2026-10-30", scamname = "QR code scams", scamdesc = "When scanning QR codes, use your smartphone’s default camera app to avoid scams and potential fraud. Scammers use 3rd party QR code scanner apps and/or the ads within the apps to direct users to fake or malicious websites designed to obtain your personal information.",
             unexpected = False, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    7 : schema.models.Scamdle(thedate = "2026-10-31", scamname = "Fake websites", scamdesc = "Legitimate-looking websites are being created by scammers, and a quick Google search will lead you to a real-looking phone number. When you call, they’ll try to obtain your sign-in details or other information.",
             unexpected = False, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    8 : schema.models.Scamdle(thedate = "2026-11-01", scamname = "Overpayment scams", scamdesc = "You receive an overpayment for an item you’re selling, immediately followed by a request to deposit the check (which turns out to be a bad check) and then send the difference via a wire or gift card.",
             unexpected = True, urgency = True, impersonation = False, unusualpayment = True, toogood = False),

    9 : schema.models.Scamdle(thedate = "2026-11-02", scamname = "Check cashing", scamdesc = "You’re approached outside a bank branch and asked to cash a check for someone who claims they don’t have an account or left their ID home. The bad check will be held against your account when it doesn’t clear. ",
             unexpected = True, urgency = True, impersonation = False, unusualpayment = True, toogood = False),

    10 : schema.models.Scamdle(thedate = "2026-11-03", scamname = "Romance scams", scamdesc = "If you are asked for financial support from a new partner in a relationship that’s been exclusively online, you’re likely a target of this elaborate scheme.",
              unexpected = True, urgency = False, impersonation = True, unusualpayment = True, toogood = False),

    11 : schema.models.Scamdle(thedate = "2026-11-04", scamname = "Charity scams", scamdesc = "You receive a request to donate to a charity that you've never heard of and for which you can’t find an official website.",
              unexpected = True, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    12 : schema.models.Scamdle(thedate = "2026-11-05", scamname = "Debt relief", scamdesc = "You receive a request for payment in order to establish a service relationship to pay, settle or get rid of debt.",
              unexpected = True, urgency = False, impersonation = False, unusualpayment = False, toogood = True),

    13 : schema.models.Scamdle(thedate = "2026-11-06", scamname = "FTC / IRS scams", scamdesc = "Scam artists are pretending to be IRS officials to get your money. They'll call, email, or text you claiming you owe back taxes or there's a problem with your tax return. They even rig caller ID to make their call look official. They play on your fears.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    14 : schema.models.Scamdle(thedate = "2026-11-07", scamname = "Investment scams", scamdesc = "You receive a request to invest in a business opportunity with promises of high returns and/or getting rich quickly.",
              unexpected = True, urgency = False, impersonation = False, unusualpayment = False, toogood = True),

    15 : schema.models.Scamdle(thedate = "2026-11-08", scamname = "Lottery scams", scamdesc = "You receive a request to prepay fees or taxes in order to receive a large prize you supposedly won.",
              unexpected = True, urgency = False, impersonation = False, unusualpayment = True, toogood = True),

    16 : schema.models.Scamdle(thedate = "2026-11-09", scamname = "Grandparent scam", scamdesc = "You receive a call or text message from someone claiming to be a grandchild or loved one asking for money to help with an emergency, plus instructions on where to send the funds.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    17 : schema.models.Scamdle(thedate = "2026-11-10", scamname = "Puppy scam", scamdesc = "Scammers post fake litters online or pretend to be someone they're not (usually an existing breeder) to take advantage of puppy sales (sans the puppies.",
              unexpected = False, urgency = False, impersonation = True, unusualpayment = False, toogood = False),

    18 : schema.models.Scamdle(thedate = "2026-11-11", scamname = "Online Merchant/Marketplace Scams", scamdesc = "When responding to ads or interacting in marketplaces on social media, research sellers and products independently to ensure legitimacy. Notice the red flags like a high-ticket item for a price too-good-to-be-true or a buyer who “accidentally” overpaid you for an item or someone asking for personal information or redirecting to an unfamiliar/strange looking URL.",
              unexpected = False, urgency = False, impersonation = False, unusualpayment = True, toogood = True),

    19 : schema.models.Scamdle(thedate = "2026-11-12", scamname = "Mortgage closing", scamdesc = "You receive an email or text message that looks similar to your real estate agent’s contact info that indicates there is a last minute change to the wiring instructions, and tells you to wire closing costs to a different account.",
              unexpected = True, urgency = True, impersonation = True, unusualpayment = True, toogood = False),

    20 : schema.models.Scamdle(thedate = "2026-11-13", scamname = "Business email compromise scams", scamdesc = "You receive an email from your supplier/vendor requesting to send money to a different account. The supplier/vendor email appears to be familiar. But this could be a fraudster who obtained access to the network of your supplier/vendor.",
              unexpected = True, urgency = False, impersonation = True, unusualpayment = True, toogood = False),

    21 : schema.models.Scamdle(thedate = "2026-11-14", scamname = "Compromised card scam", scamdesc = "Scammers call claiming to be from your bank and say that your card has been compromised. They’ll attempt to send someone to your home to “secure” your account by destroying your card. Though they may seem to be legitimate, once they have possession of the card, they’ll use it to steal money from the account.",
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