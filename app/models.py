from app import db
from datetime import datetime


class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow())
    body = db.Column(db.Text, nullable=False)
    done = db.Column(db.Boolean, default=False)

    def __repre__(self):
        return f'{self.body}'
