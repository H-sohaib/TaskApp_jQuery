from app import app, db
from app.models import Tasks


with app.app_context():
    db.drop_all()
    db.create_all()
    task = Tasks(body='test task')
    task2 = Tasks(body='test2 task', done=True)
    db.session.add(task)
    db.session.add(task2)
    db.session.commit()
    t = db.session.scalars(db.select(Tasks)).all()
    for i in t:
        print(i.body)
    print(t)
    print(type(t))
