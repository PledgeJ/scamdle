CREATE TABLE users ( 
    userid TEXT primary key not null, 
    username TEXT not null, 
    passwordhash TEXT not null 
);

CREATE TABLE users_past_scores ( 
    userid TEXT not null, 
    puzzleday TEXT not null,
    submitted INTEGER not null, -- the timestamp
    gameid INTEGER not null, 
    score INTEGER default 0, 
    primary key (userid, puzzleday, gameid),
    foreign key (gameid) references games(gameid)
);

CREATE TABLE games ( 
    gameid INTEGER primary key, 
    gamename TEXT not null, 
    timelimit INTEGER default -1, 
    roundmaxscore INTEGER not null default 100,
    datapath TEXT not null 
);

CREATE TABLE phishing_email_entries ( 
    sectionid TEXT not null primary key,
    puzzleday TEXT not null, 
    offsetstart INTEGER not null, -- where the section starts in characters (0 = 1st character)
    offsetend INTEGER not null,  -- where the section ends 
    explanation TEXT,
    isscam BOOLEAN default FALSE
);

CREATE TABLE phishing_emails ( 
    puzzleday TEXT primary key not null, 
    emailtext TEXT
);

CREATE TABLE sms (
    smsid INT primary key not null,
    dayid TEXT not null,
    isscam BOOLEAN not null,
    reason1 TEXT,
    reason2 TEXT,
    message TEXT
)