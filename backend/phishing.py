import datetime 
import schema.models as models
from typing import Union, Optional 
from sqlalchemy.orm import Session 
from sqlalchemy import select
from pydantic import BaseModel

def get_sections(db : Session, puzzleday : datetime.date) -> list[dict[str : Union[str, int]]]:
    stmt = (select(models.PhishingEmailEntry)
           .where(models.PhishingEmailEntry.puzzleday == puzzleday.strftime("%Y-%m-%d"))
           .order_by(models.PhishingEmailEntry.offsetstart.asc())
        )
    
    output = db.scalars(stmt).all()
    
    sections = []
    for row in output: 
        sections.append({ 
                            "id" : row.sectionid,
                            "start" : row.offsetstart,
                            "end" : row.offsetend,
                         })
    return sections 


def get_mail(db : Session, puzzleday : datetime.date) -> Optional[str]: 
    output = db.get(models.PhishingEmail, puzzleday.strftime("%Y-%m-%d"))
    
    if output is None: 
        return None 
    
    return output.emailtext


# When a single section is clicked, there should be a right/wrong response now 
# if correct -> true? else false
def submit_result(db : Session, sectionuid : str, puzzleday : datetime.date) -> bool: 
    check = (select(models.PhishingEmailEntry.isscam)
             .where(models.PhishingEmailEntry.puzzleday == puzzleday.strftime("%Y-%m-%d"))
             .where(models.PhishingEmailEntry.sectionid == sectionuid))
    
    return db.scalars(check).one()

# get count of things sections that are labelled as "scam" in the database. 
def get_correct_count(db : Session, puzzleday : datetime.date) -> int: 
    return (db.query(models.PhishingEmailEntry)
             .where(models.PhishingEmailEntry.isscam == True)
             .where(models.PhishingEmailEntry.puzzleday == puzzleday.strftime("%Y-%m-%d"))
             .count())
    
