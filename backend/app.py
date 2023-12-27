from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, joinedload
from flask_sqlalchemy import SQLAlchemy
from flask import Flask


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///quiz.db"
db = SQLAlchemy(app)

import logging

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

CORS(app)


class Categories(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    emoji = Column(String, nullable=False)
    questions = relationship("Questions", backref="category")


class Questions(db.Model):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    question_text = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    answers = relationship("Answers", backref="question")


class Answers(db.Model):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    answer_text = Column(String, nullable=False)
    is_correct = Column(Boolean, nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"))


# with app.app_context():
#     db.create_all()

@app.route("/api/categories", methods=["GET"])
def get_categories():
    categories = Categories.query.all()
    data = [
        {
            "id": category.id,
            "name": category.name,
            "emoji": category.emoji,
        }
        for category in categories
    ]
    return jsonify(data)


@app.route("/api/quiz_data", methods=["GET"])
def get_quiz_data():
    # Query all categories and their associated questions and answers
    quiz_id = request.args.get("quiz_id")
    print("Received quiz_id:", quiz_id)

    
    quiz = (
            Categories.query
            .options(joinedload(Categories.questions).joinedload(Questions.answers))
            .filter_by(id=quiz_id)
            .first()
        )
    
    
    data = [
            {
                "question_id": question.id,
                "question_text": question.question_text,
                "category": question.category.name,
                "answers": [
                    {
                        "answer_id": answer.id,
                        "answer_text": answer.answer_text,
                        "is_correct": answer.is_correct,
                    }
                    for answer in question.answers
                ]
            }
            for question in quiz.questions
            ]
        
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
