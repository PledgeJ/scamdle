from fastapi import FastAPI, Depends, Request, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel 

import datetime
import os 
import uuid

import phishing
import sms
import scamdle
import auth 


from schema.models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session 

from typing import Annotated

from schema.models import User, DailyProgress


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "sqlite:///./scamdle.db"
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
Base.metadata.create_all(engine)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Oauth2Scheme = OAuth2PasswordBearer(tokenUrl="/api/login", auto_error=False)
origins = ["https://eastcoast-darkness-bullwhip.ngrok-free.dev", "http://0.0.0.0:8000", "http://127.0.0.1:8000", "http://127.0.0.1:5173"]

app = FastAPI()
app.add_middleware(SessionMiddleware, b'\xf7\xc3\xe6\x94h\xf1\xc0\xc80\x84\xb0m\x00\xb5\xcd\xd4\xec\x86\x1f\x12\xef\xc9,d\x9f\xa7\x1dC\\\\GE', )
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class RegisterPayload(BaseModel):
    username : str 
    password : str 
    
def get_db():
    db = SessionLocal()
    try:
        yield db  # This is handed over to the endpoint
    finally:
        db.close()  # Guaranteed to close after the response is sent
        
def get_current_user(token : Annotated[str | None, Depends(Oauth2Scheme)], db : Annotated[Session, Depends(get_db)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if token is None:
        return None
    
    try:
        return auth.decode_token(token) 
    except Exception:
        return None 
    
def getpuzzleday(): 
    return datetime.datetime.now(datetime.timezone.utc).replace(
    hour=0, minute=0, second=0, microsecond=0)
    
@app.get('/api/') 
def root(): 
    return {"hello" : "Another Hello World!"}


@app.get('/api/phishing/daily')
def get_daily_email(db : Session = Depends(get_db)): 
    puzzleday = getpuzzleday()
    
    return { 
            "puzzleday" : puzzleday.timestamp(), 
            "mail" : phishing.get_mail(db, puzzleday), 
            "sections" : phishing.get_sections(db, puzzleday) 
        }
    
@app.post("/api/phishing/submit/{sectionuid}")
def submit_daily_email(request : Request, 
                       sectionuid : str, 
                       db : Session = Depends(get_db), 
                       current_user : User | None = Depends(get_current_user), 
                       x_player_id : Annotated[str | None, Header()] = None ): 
    db_user_id = None
    session_player_id = None
    
    if current_user:
        db_user_id = current_user.id # Use the real user's ID
    elif x_player_id:
        # Fall back to anonymous session tracking
        session_player_id = x_player_id
    else: 
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing X-Player-Id Header.")
    
    puzzleday = getpuzzleday()

    is_correct = phishing.submit_result(db, sectionuid, puzzleday)
    
    query = db.query(DailyProgress).filter(DailyProgress.game_date == puzzleday.strftime("%Y-%m-%d"))
    if current_user:
        query = query.filter(DailyProgress.user_id == db_user_id)
    else:
        query = query.filter(DailyProgress.player_id == session_player_id)
        
    existing_clicks = query.all()
    current_correct_ids = [click.sectionuid for click in existing_clicks]

    # 3. Save to DB
    if is_correct and sectionuid not in current_correct_ids:
        new_click = DailyProgress(
            user_id=db_user_id,             # Will be None if anonymous
            player_id=session_player_id,    # Will be None if logged in
            game_date=puzzleday.strftime("%Y-%m-%d"),
            sectionuid=sectionuid
        )
        db.add(new_click)
        db.commit()
        current_correct_ids.append(sectionuid)
        
    return { 
        "correct" : is_correct, 
        "explanation" : phishing.get_explanation(db, sectionuid),
        "done" : phishing.get_correct_count(db, puzzleday) == len(current_correct_ids) 
    }


@app.get("/api/sms/daily")
def get_daily_sms(db : Session = Depends(get_db)):
    puzzleday = getpuzzleday()
    texts = sms.uploadTexts(db, str(puzzleday)[0:10])
    return {
        "puzzleday" : puzzleday.timestamp(),
        "textData" : texts
    }

@app.get("/api/whichscam/daily")
def get_daily_scam(db : Session = Depends(get_db)):
    puzzleday = getpuzzleday()
    model = scamdle.getScamOfTheDay(db, str(puzzleday)[0:10])
    return {
        "puzzleday" : puzzleday.timestamp(),
        "name": model.scamname,
        "desc" : model.scamdesc,
        "unexpected" : model.unexpected,
        "urgency" : model.urgency,
        "impersonation" : model.impersonation,
        "unusualPayment" : model.unusualpayment,
        "toogood" : model.toogood
    }

def getScam(db : Session = Depends(get_db)):
    model = scamdle.getScamOfTheDay(db, str(getpuzzleday())[0:10])

    return model


    
#Given Guess is the string variable passed to us, which will always be the exact wording of a Scam from the 
# capital one scam list: https://www.capitalone.com/help-center/fraud-disputes/common-scam-types/ 

@app.post("/api/whichscam/verify")
def verify_daily_scam(givenGuess : Annotated[str | None, Header()] = None , db : Session = Depends(get_db)):
    model = getScam(db)
    guessModel = scamdle.getScamFromName(db, givenGuess) #This function needs to be able to query the data base and return the model where the scam name == givenGuess

    return {
        "puzzleday" : getpuzzleday().timestamp(),
        "correctscam" : model.scamname == givenGuess,
        "desc" : guessModel.scamdesc,
        "unexpected" : model.unexpectedmodel.urgency == guessModel.urgency,
        "urgency" : model.urgency == guessModel.urgency,
        "impersonation" : model.impersonation == guessModel.impersonation,
        "unusualPayment" : model.unusualpayment == guessModel.unusualPayment,
        "toogood" : model.toogood == guessModel.toogood  
    }
    

    
    
@app.post("/api/login")
def login(form_data : Annotated[OAuth2PasswordRequestForm, Depends()], db : Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    
    if user is None: 
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password", 
            headers={"WW-Authenticate" : "Bearer"}
        )
    
    token = auth.create_access_token(form_data.username)
    
    return { "access_token" : token, "token_type" : "bearer"} 

@app.post("/api/register")
def register_user(payload : RegisterPayload, db : Annotated[Session, Depends(get_db)]): 
    if auth.get_user_by_name(db, payload.username): 
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, 
            detail="Username taken" 
        )
        
    auth.register_user(db, payload.username, payload.password)
    return {"access_token" : auth.create_access_token(payload.username), "token_type" : "bearer"}

@app.post("/api/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out and session cleared"}

@app.get("/api/me")
def current_user(current_user : Annotated[User, Depends(get_current_user)]):
    return current_user

@app.get("/api/reqid")
def get_player_id(): 
    return {"id" : str(uuid.uuid4())}

