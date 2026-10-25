from fastapi import FastAPI, Depends, Request, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel 

import datetime
import os 

import phishing
import sms
import scamdle
import auth 


from schema.models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session 

from typing import Annotated

from schema.models import User 


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "sqlite:///./scamdle.db"
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
Base.metadata.create_all(engine)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Oauth2Scheme = OAuth2PasswordBearer(tokenUrl="/api/login")
origins = ["*"]

app = FastAPI()
app.add_middleware(SessionMiddleware, str(os.urandom(32)))
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
class RegisterPayload(BaseModel):
    username : str 
    password : str 
    
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
        "explanation" : phishing.get_explanation(db, sectionuid),
        "done" : phishing.get_correct_count(db, puzzleday) == len(current_correct_ids) 
    }


@app.get("/api/sms/daily")
def get_daily_sms():
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0)
    texts = sms.uploadTexts(str(puzzleday)[0:10])
    return {
        "puzzleday" : puzzleday.timestamp(),
        "textData" : texts
    }

@app.get("/api/whichscam/daily")
def get_daily_scam(db : Session = Depends(get_db)):
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
            hour=0, minute=0, second=0, microsecond=0)
    model = scamdle.getScamOfTheDayTemp(db, str(puzzleday)[0:10])
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
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
                hour=0, minute=0, second=0, microsecond=0)
    model = scamdle.getScamOfTheDayTemp(db, str(puzzleday)[0:10])

    return model


    
#Given Guess is the string variable passed to us, which will always be the exact wording of a Scam from the capital one scam list: https://www.capitalone.com/help-center/fraud-disputes/common-scam-types/ 
'''
@app.get("/api/whichscam/verify")
def verify_daily_scam(givenGuess):
    puzzleday = datetime.datetime.now(datetime.timezone.utc).replace(
                hour=0, minute=0, second=0, microsecond=0)
    model = getScam(puzzleday)
    if model.scamname == givenGuess:
        correctScam = True
    else:
        correctScam = False
    
    guessModel = getScamFromName(givenGuess) #This function needs to be able to query the data base and return the model where the scam name == givenGuess


    
    if correctScam == True:
        return {
            "puzzleday" : puzzleday.timestamp(),
            "correctscam" : correctScam,
            "desc" : guessModel.scamdesc,
            "unexpected" : model.unexpectedmodel.urgency == guessModel.urgency,
            "urgency" : model.urgency == guessModel.urgency,
            "impersonation" : model.impersonation == guessModel.impersonation,
            "unusualPayment" : model.unusualpayment == guessModel.unusualPayment,
            "toogood" : model.toogood == guessModel.toogood  

    }
    elif correctScam == False:
        return{
            "puzzleday" : puzzleday.timestamp(),
            "correctscam" : correctScam,
            "desc" : guessModel.scamdesc,
            "unexpected" : model.unexpectedmodel.urgency == guessModel.urgency,
            "urgency" : model.urgency == guessModel.urgency,
            "impersonation" : model.impersonation == guessModel.impersonation,
            "unusualPayment" : model.unusualpayment == guessModel.unusualPayment,
            "toogood" : model.toogood == guessModel.toogood
        }
'''
    
    
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

def get_current_user(token : Annotated[str, Depends(Oauth2Scheme)], db : Annotated[Session, Depends(get_db)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return auth.decode_token(token)

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
