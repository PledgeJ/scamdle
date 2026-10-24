from fastapi import FastAPI, Depends, Request
from starlette.middleware.sessions import SessionMiddleware
import datetime
import os 

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
app.add_middleware(SessionMiddleware, str(os.urandom(32)))

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
    
@app.post("/api/phishing/submit/{sectionuid}")
def submit_daily_email(request : Request, sectionuid : str, db : Session = Depends(get_db)): 
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0)
    
    current_correct_ids : list[str] = request.session.get('correct_ids', [])
    is_correct = phishing.submit_result(db, sectionuid, puzzleday)
    if is_correct and sectionuid not in current_correct_ids: # correct answer
        current_correct_ids.append(sectionuid)
        request.session["correct_ids"] = current_correct_ids
        
    return { 
        "correct" : is_correct, 
        "done" : phishing.get_correct_count(db, puzzleday) == len(current_correct_ids) 
    }


@app.get("api/sms/daily")
def get_daily_sms():
    currentDay = datetime.datetime.now(datetime.timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0)

    return {
        "puzzleday" : currentDay,
        "images" : images
    }