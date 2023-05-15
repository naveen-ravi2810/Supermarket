import os
from dotenv import load_dotenv
import smtplib
from validate_email import validate_email

load_dotenv()

def send_mail_for_otp(email, otp):
    sender_email = os.getenv("mail_id")
    sender_password = os.getenv("mail_password")
    server = smtplib.SMTP('smtp.gmail.com', 587)
    message_text = f"The OTP is {otp}"
    server.starttls()
    server.login(sender_email, sender_password)
    if validate_email(email):
        server.sendmail(sender_email, email, message_text)
    else:
        return "The Email is in Correct"
    
def send_mail_for_verify(email, otp):
    sender_email = os.getenv("mail_id")
    sender_password = os.getenv("mail_password")
    server = smtplib.SMTP('smtp.gmail.com', 587)
    message_text = f"The verification OTP is {otp}"
    server.starttls()
    server.login(sender_email, sender_password)
    if validate_email(email):
        server.sendmail(sender_email, email, message_text)
    else:
        return "The Email is not Correct"