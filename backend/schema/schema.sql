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

CREATE TABLE IF NOT EXISTS daily_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NULL,
    player_id TEXT NULL,
    game_date TEXT NOT NULL,
    sectionuid TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS ix_daily_progress_id ON daily_progress (id);
CREATE INDEX IF NOT EXISTS ix_daily_progress_user_id ON daily_progress (user_id);
CREATE INDEX IF NOT EXISTS ix_daily_progress_player_id ON daily_progress (player_id);
CREATE INDEX IF NOT EXISTS ix_daily_progress_game_date ON daily_progress (game_date);

CREATE TABLE sms (
    smsid INTEGER primary key not null,
    dayid TEXT not null,
    isscam BOOLEAN not null,
    reason1 TEXT not null,
    reason2 TEXT,
    message TEXT not null
);

CREATE TABLE scamdle (
    date TEXT primary key not null,
    name TEXT not null,
    desc TEXT not null,
    unexpected BOOLEAN not null,
    urgency BOOLEAN not null,
    impersonation BOOLEAN not null,
    unusualpayment BOOLEAN not null,
    toogood BOOLEAN not null
);