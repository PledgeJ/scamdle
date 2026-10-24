from sqlalchemy.orm import Session 
from sqlalchemy.orm.exc import NoResultFound
from schema.models import User 

from pwdlib import PasswordHash
import jwt 

import uuid
import datetime 

password_hasher = PasswordHash.recommended()
ACCESS_TOKEN_EXPIRE_MINUTES = 30 
SECRET_KEY = "2179cd5a3a91ae02835c76d1ba7c338ff3f1c6b82bb31243cfe87471f8619fdb"
ALGORITHM = "HS256"

def verify_password(plain, hashed): 
    return password_hasher.verify(plain, hashed)

def hash_password(plain): 
    return password_hasher.hash(plain)

def register_user(db : Session, username : str, password : str): 
    new_user = User(
        userid = str(uuid.uuid4()),
        username = username, 
        passwordhash = hash_password(password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

def authenticate_user(db : Session, username, password): 
    try: 
        userinfo = db.query(User).where(User.username == username).one()
    except NoResultFound: 
        return None 
    
    if verify_password(password, userinfo.passwordhash):
        return userinfo 

    return None 

def get_user_by_name(db : Session, username : str): 
    try: 
        userinfo = db.query(User).where(User.username == username).one()
    except NoResultFound: 
        return None 
    
    return userinfo 

def create_access_token(username : str): 
    expiry = datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.datetime.now(datetime.timezone.utc) + expiry 
    
    return jwt.encode({"sub" : username, "exp" : expire}, SECRET_KEY, algorithm=ALGORITHM)
    
def decode_token(db : Session, token : str): 
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None: 
            return None  
    except jwt.InvalidTokenError: 
        return None  
    
    return get_user_by_name(db, username)
