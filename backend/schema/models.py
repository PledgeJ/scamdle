from typing import Optional
from sqlalchemy import (
    BigInteger,
    ForeignKey,
    ForeignKeyConstraint,
    Integer,
    LargeBinary,
    String,
    Text,
    Boolean
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    userid: Mapped[str] = mapped_column(Text, primary_key=True)
    username : Mapped[str] = mapped_column(Text, nullable=False)
    passwordhash: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    past_scores: Mapped[list["UsersPastScore"]] = relationship(
        back_populates="user"
    )


class Game(Base):
    __tablename__ = "games"

    gameid: Mapped[int] = mapped_column(Integer, primary_key=True)
    gamename: Mapped[str] = mapped_column(Text, nullable=False)
    timelimit: Mapped[Optional[int]] = mapped_column(Integer, server_default="-1")
    roundmaxscore: Mapped[int] = mapped_column(
        Integer, nullable=False, server_default="100"
    )
    datapath: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    past_scores: Mapped[list["UsersPastScore"]] = relationship(
        back_populates="game"
    )   


class UsersPastScore(Base):
    __tablename__ = "users_past_scores"

    userid: Mapped[str] = mapped_column(
        Text, ForeignKey("users.userid"), primary_key=True
    )
    puzzleday: Mapped[str] = mapped_column(Text, primary_key=True)
    gameid: Mapped[int] = mapped_column(
        Integer, ForeignKey("games.gameid"), primary_key=True
    )

    submitted: Mapped[int] = mapped_column(
        BigInteger, nullable=False, comment="the timestamp"
    )
    score: Mapped[Optional[int]] = mapped_column(
        Integer, server_default="0"
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="past_scores")
    game: Mapped["Game"] = relationship(back_populates="past_scores")


class PhishingEmail(Base):
    __tablename__ = "phishing_emails"

    puzzleday: Mapped[str] = mapped_column(Text, primary_key=True)
    emailtext: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    entries: Mapped[list["PhishingEmailEntry"]] = relationship(
        back_populates="email"
    )


class PhishingEmailEntry(Base):
    __tablename__ = "phishing_email_entries"

    sectionid : Mapped[str] = mapped_column(
        Text, primary_key=True, nullable=False
    )
    
    puzzleday: Mapped[str] = mapped_column(
        Text, ForeignKey("phishing_emails.puzzleday")
    )
    offsetstart: Mapped[int] = mapped_column(
        Integer,
        comment="where the section starts in characters (0 = 1st character)",
    )
    offsetend: Mapped[int] = mapped_column(
        Integer, comment="where the section ends"
    )
    explanation: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    isscam : Mapped[bool] = mapped_column(Boolean, default=False)
    # Relationships
    email: Mapped["PhishingEmail"] = relationship(back_populates="entries")
    
class DailyProgress(Base):
    __tablename__ = "daily_progress"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    # Optional foreign key to User model
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.userid"), 
        nullable=True, 
        index=True
    )

    # Optional UUID string for anonymous cookie sessions
    player_id: Mapped[Optional[str]] = mapped_column(
        String, 
        nullable=True, 
        index=True
    )

    # Date of the puzzle submission
    game_date: Mapped[str] = mapped_column(
        Text, 
        index=True
    )

    # Unique section ID of the clicked word/section
    sectionuid: Mapped[str] = mapped_column(String)


class Sms(Base):
    __tablename__ = "sms"

    smsis : Mapped[int] = mapped_column(
        Integer, primary_key=True, nullable=False
    )
    dayid : Mapped[str] = mapped_column(
        Text, nullable=False
    )
    isscam: Mapped[bool] = mapped_column(
        Boolean, nullable=False
    )
    reason1: Mapped[str] = mapped_column(
        Text, nullable=False
    )
    reason2: Mapped[str] = mapped_column(
       Text
    )
    message: Mapped[str] = mapped_column(
        Text, nullable=False
    )


class Scamdle(Base):
    __tablename__ = "scamdle"


    date : Mapped[str] = mapped_column(
        Text, primary_key=True, nullable=False
    )
    name : Mapped[str] = mapped_column(
        Text, nullable=False
    )
    desc : Mapped[str] = mapped_column(
        Text, nullable=False
    )
    unexpected : Mapped[bool] = mapped_column(
        Boolean, nullable=False
    )
    urgency : Mapped[bool] = mapped_column(
        Boolean, nullable=False
    )
    impersonation : Mapped[bool] = mapped_column(
        Boolean, nullable=False
    )
    unusualpayment : Mapped[bool] = mapped_column(
        Boolean, nullable=False
    )
    toogood : Mapped[bool] = mapped_column(
        Boolean, nullable=False
    )