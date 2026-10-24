import sqlite3
import datetime 
import schema.models as models
from typing import Union, Optional 
from sqlalchemy.orm import Session 
from sqlalchemy import select
from pydantic import BaseModel


class PhishingScorePayload(BaseModel): 
    score : int 
    
def get_sections(db : Session, puzzleday : datetime.date) -> list[dict[str : Union[str, int]]]:
    stmt = (select(models.PhishingEmailEntry)
           .where(models.PhishingEmailEntry.puzzleday == puzzleday.strftime("%Y-%m-%d"))
           .order_by(models.PhishingEmailEntry.offsetstart.asc())
        )
    
    output = db.scalars(stmt).all()
    
    sections = []
    for row in output: 
        sections.append({ 
                            "start" : row.offsetstart,
                            "end" : row.offsetend,
                            "explanation" : row.explanation
                         })
    return sections 


def get_mail(db : Session, puzzleday : datetime.date) -> Optional[str]: 
    output = db.get(models.PhishingEmail, puzzleday.strftime("%Y-%m-%d"))
    
    if output is None: 
        return None 
    
    return output.emailtext


# TODO ingest correct sections and score into users db
def submit_result(db : Session, phishing_game_result : PhishingScorePayload, puzzleday : datetime.date) -> None: 
    pass