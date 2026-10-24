from fastapi import FastAPI, Depends
import datetime
import sqlite3 
import phishing
import sms

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session 

DATABASE_URL = "sqlite:///./scamdle.db"
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db  # This is handed over to the endpoint
    finally:
        db.close()  # Guaranteed to close after the response is sent
        

@app.get('/api/') 
def root(): 
    return {"hello" : "Another Hello World!"}


@app.get('/api/phishing/daily')
def get_daily_email(db : Session = Depends(get_db)): 
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
    hour=0, minute=0, second=0, microsecond=0)
    
    return { 
            "puzzleday" : puzzleday.timestamp(), 
            "mail" : phishing.get_mail(db, puzzleday), 
            "sections" : phishing.get_sections(db, puzzleday) 
        }
    
@app.post("/api/phishing/submit")
def submit_daily_email(payload : phishing.PhishingScorePayload, db : Session = Depends(get_db)): 
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0)
    
    phishing.submit_result(db, payload, puzzleday)


@app.get("api/sms/daily")
def get_daily_sms():
    currentDay = datetime.datetime.now(datetime.timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0)
    images = sms.uploadImages(currentDay)
    return {
        "puzzleday" : currentDay,
        "images" : images
    }