from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship, joinedload
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from datetime import datetime


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///quiz.db"
db = SQLAlchemy(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

import logging

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


class Categories(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    emoji = Column(String, nullable=False)
    difficulty = Column(String, nullable=False, default="easy")
    timestamp = Column(DateTime, server_default=func.now(), nullable=False)
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

# @app.route("/", methods=["GET"])
# def index():
#     return "hello luca"

@app.route("/api/add_question", methods=["POST"])
def post_question():
    data = request.get_json()
    print("Received data:", data)

    category = Categories(
        name=data["category"], emoji=data["emoji"], difficulty=data["difficulty"]
    )
    db.session.add(category)

    for question_data in data["questions"]:
        new_question = Questions(
            question_text=question_data["question_text"], category=category
        )
        db.session.add(new_question)

        # Create answers
        for answer_data in question_data["answers"]:
            new_answer = Answers(
                answer_text=answer_data["answer_text"],
                is_correct=answer_data["is_correct"],
                question=new_question,
            )
            new_question.answers.append(
                new_answer
            )  # Use the relationship property to append the answer
            db.session.add(new_answer)

    db.session.commit()
    print("Added data to the database")

    return jsonify({"message": "Questions added successfully"}), 201


@app.route("/api/categories", methods=["GET"])
def get_categories():
    categories = Categories.query.all()
    data = [
        {
            "id": category.id,
            "name": category.name,
            "emoji": category.emoji,
            "difficulty": category.difficulty,
            "timestamp": category.timestamp,
            "num_questions": len(category.questions),
        }
        for category in categories
    ]
    data.sort(key=lambda x: x["timestamp"], reverse=True)
    return jsonify(data)


@app.route("/api/quiz_data", methods=["GET"])
def get_quiz_data():
    # Query all categories and their associated questions and answers
    quiz_id = request.args.get("quiz_id")
    print("Received quiz_id:", quiz_id)

    quiz = (
        Categories.query.options(
            joinedload(Categories.questions).joinedload(Questions.answers)
        )
        .filter_by(id=quiz_id)
        .first()
    )

    data = [
        {
            "question_id": question.id,
            "question_text": question.question_text,
            "category": question.category.name,
            "emoji": question.category.emoji,
            "answers": [
                {
                    "answer_id": answer.id,
                    "answer_text": answer.answer_text,
                    "is_correct": answer.is_correct,
                }
                for answer in question.answers
            ],
        }
        for question in quiz.questions
    ]

    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
