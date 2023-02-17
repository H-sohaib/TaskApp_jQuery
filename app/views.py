from app import app, db
from app.models import Tasks
from flask import render_template, request


@app.route("/", methods=['GET', 'DELETE', 'POST', 'UPDATE'])
def index():
    if request.method == 'DELETE':
        id = request.form['id']
        task = db.session.scalars(db.select(Tasks).filter_by(id=id)).one()
        print(task)
        db.session.delete(task)
        db.session.commit()
        return 'removed'

    elif request.method == 'POST':
        task = Tasks(body=request.form['body'])
        db.session.add(task)
        db.session.commit()
        id = db.session.scalars(db.select(Tasks)).all()
        print(id[-1].id)
        return f'{id[-1].id}'
    elif request.method == 'UPDATE':
        print(request.form)
        task = db.session.scalars(
            db.select(Tasks).filter_by(id=request.form["id"])).one()
        if (request.form["done"] == 'true'):
            task.done = True
        else:
            task.done = False
        db.session.commit()
        return 'updated'
    tasks = db.session.scalars(db.select(Tasks)).all()
    return render_template("index.html", tasks=tasks)
