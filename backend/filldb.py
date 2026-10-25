import sqlite3 

with open(r"backend/schema/schema.sql", "r") as schema: 
    sql = schema.read()
    
conn = sqlite3.connect(r"backend/scamdle.db")
cur = conn.cursor()
cur.executescript(sql)
# cur.execute("""INSERT INTO phishing_emails VALUES ('2026-10-25', 'FRANK WILSON <[REDACTED]> Tue 16/02/2021 13:53 To: Recipients   Attention Beneficiary.   THis is to inform you that after the meeting held in my office yesterday which consist between the United States Embassy and the United Nations, African ECO-WAS, we have concluded that you will be compensated with all the money you have loosed in the hands of Africans and most especially NIGERIA precisely.   We have deposited the cheque of your fund ($4,80000000USD) through Western Union department after our finally meeting regarding your fund, All you will do is to contact Western Union director Dr.Demion Great via E-mail (western.union[REDACTED]@gmail.com) Tel:+234 [REDACTED], He will give you direction on how you will be receiving the funds daily.Remember to send him your Full information to avoid wrong transfer such as,   Your Full name...................   Your home Address..............   Your telephone number.............   A copy of your ID..................   Your age/sex......................   Your occupation...................   Your country........................   Though,Mr.Frank Wilson has sent $5000 in your name today so contact Dr.Demion Great or you call him Tel:+234 [REDACTED], as soon as you receive this email and tell him to give you the Mtcn, sender name and question/answer to pick the $5000 Please let us know as soon as you received all your fund,   Yours sincerely
# Western Union Team')""")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('abc-def-ghi-1234', '2026-10-25', 0, 3, 'The first word of the email. Test Test Test', TRUE)")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('abc-def-ghi-1254', '2026-10-25', 3, 8, 'The first word of the email. Test Test Test', FALSE)")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('bbb-ccc-ddd-9876', '2026-10-25', 8, 14, 'The first word of the email. Test Test Test', FALSE)")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('asd-fgh-jkl-1357', '2026-10-25', 14, 29, 'The word testing. Test Test Test', FALSE)")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('was-edf-rtg-1209', '2026-10-25', 29, 41, 'The word testing. Test Test Test', TRUE)")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('lak-wer-bir-0231', '2026-10-25', 29, 41, 'The word testing. Test Test Test', TRUE)")
# cur.execute("INSERT INTO phishing_email_entries VALUES ('aws-cdg-cgcc-1265', '2026-10-25', 41, 55, 'The word testing. Test Test Test', FALSE)")
# conn.commit()

cur.execute("""INSERT INTO phishing_emails (puzzleday, emailtext) VALUES
    ('2026-10-25', 'FRANK WILSON <[REDACTED]> Tue 16/02/2021 13:53 To: Recipients
    Attention Beneficiary.
    THis is to inform you that after the meeting held in my office yesterday which consist between the United States Embassy and the United Nations, African ECO-WAS, we have concluded that you will be compensated with all the money you have loosed in the hands of Africans and most especially NIGERIA precisely.
    We have deposited the cheque of your fund ($4,80000000USD) through Western Union department after our finally meeting regarding your fund, All you will do is to contact Western Union director Dr.Demion Great via E-mail (western.union0214@gmail.com) Tel:+234 4693 2398, He will give you direction on how you will be receiving the funds daily. Remember to send him your Full information to avoid wrong transfer such as,
    1. Your Full name..................
    2. Your home Address.............
    3. Your telephone number............
    4. A copy of your ID.................
    5. Your age/sex....................
    6. Your occupation..................
    7. Your country......................
    Though,Mr.Frank Wilson has sent $5000 in your name today so contact Dr.Demion Great or you call him Tel:+234 4693 2398, as soon as you receive this email and tell him to give you the Mtcn, sender name and question/answer to pick the $5000 Please let us know as soon as you received all your fund,
    Yours sincerely Western Union Team');""")

cur.execute("""INSERT INTO phishing_email_entries (sectionid, puzzleday, offsetstart, offsetend, explanation, isscam) VALUES
    ('2026-10-25-001', '2026-10-25', 0, 26, 'Nothing suspicious here on its own.', FALSE),
    ('2026-10-25-002', '2026-10-25', 26, 61, 'Nothing suspicious here on its own.', FALSE),
    ('2026-10-25-003', '2026-10-25', 61, 88, 'Generic greeting. A real organisation would address you by name, not as a vague ''''Beneficiary''''.', TRUE),
    ('2026-10-25-004', '2026-10-25', 88, 253, '1 capitalisation error shows they didnt proof read, very big organisations mentioned.', TRUE),
    ('2026-10-25-005', '2026-10-25', 253, 543, 'WAY too good to be true + bad grammar.', TRUE),
    ('2026-10-25-006', '2026-10-25', 543, 653, 'gmail.com domain email. A large company would USUALLY have a custom domain.', TRUE),
    ('2026-10-25-007', '2026-10-25', 653, 673, 'Phone number registered outside America, an American company would be calling from American phone numbers.', TRUE),
    ('2026-10-25-008', '2026-10-25', 673, 746, 'They are saying theyre going to call everyday, but not TOO bad.', FALSE),
    ('2026-10-25-009', '2026-10-25', 746, 1106, 'Asking for all of your personal data.', TRUE),
    ('2026-10-25-010', '2026-10-25', 1106, 1194, 'Too good to be true.', TRUE),
    ('2026-10-25-011', '2026-10-25', 1194, 1229, 'Phone number registered outside America, an American company would be calling from American phone numbers.', TRUE),
    ('2026-10-25-012', '2026-10-25', 1229, 1349, 'Poor grammar and asking for personal details.', FALSE),
    ('2026-10-25-013', '2026-10-25', 1349, 1412, 'Nothing suspicious here on its own', FALSE),
    ('2026-10-25-014', '2026-10-25', 1412, 1446, 'Nothing suspicious here on its own', FALSE);
    """)

conn.commit()


def drop_db(path : str): 
    with open(path, "w") as file: 
        file.write("")
        
def restore_db(path : str, schema_path : str): 
    with open(schema_path, "r") as schema: 
        sql = schema.read()
    
    conn = sqlite3.connect(path)
    cur = conn.cursor()
    cur.executescript(sql)