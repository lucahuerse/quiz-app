from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

import logging

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///quiz.db"
db = SQLAlchemy(app)


# Define your models outside the route function to avoid redefinition on each request
class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.Text, nullable=False)
    category = db.Column(db.Text)


class Answers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_text = db.Column(db.Text, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)
    question = db.relationship("Questions", backref=db.backref("answers", lazy=False))


# Create tables outside the route function to avoid repeated creation
with app.app_context():
    db.create_all()


@app.route("/api/quiz_data", methods=["GET"])
def get_quiz_data():
    # Move the model definitions and database creation outside of the route function

    questions_data = db.session.query(Questions).all()

    questions_count = db.session.query(func.count(Questions.id)).scalar()

    data = [
        {
            "question_id": q.id,
            "question_text": q.question_text,
            "category": q.category,
            "answers": [
                {
                    "answer_id": a.id,
                    "answer_text": a.answer_text,
                    "is_correct": a.is_correct,
                }
                for a in q.answers
            ],
        }
        for q in questions_data
    ]

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
