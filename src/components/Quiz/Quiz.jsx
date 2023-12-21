import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

export default function Quiz() {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);


    let optionArray = [Option1, Option2, Option3, Option4];

    const checkAnswer = (element, answer) => {
        if (!lock) {
            if (question.ans === answer) {
                element.target.classList.add("correct");
                setScore(prev => prev + 1);
            }
            else {
                element.target.classList.add("incorrect");
                optionArray[question.ans - 1].current.classList.add("correct");
            }

            setLock(true);
        }

    }

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            optionArray.map((option) => {
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        console.log(index);
        setLock(false);
        setScore(0);
        setResult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? <>
                <h2>You scored {score} out of {data.length} points.</h2>
                <button onClick={reset}>Reset</button>
            </> : <>
                <h2>{index + 1}. {question.question}</h2>
                <ul>
                    <li ref={Option1} onClick={(element) => { checkAnswer(element, 1) }}>{question.option1}</li>
                    <li ref={Option2} onClick={(element) => { checkAnswer(element, 2) }}>{question.option2}</li>
                    <li ref={Option3} onClick={(element) => { checkAnswer(element, 3) }}>{question.option3}</li>
                    <li ref={Option4} onClick={(element) => { checkAnswer(element, 4) }}>{question.option4}</li>
                </ul>
                <button onClick={next}>Next</button>
                <div className="index">{index + 1} of {data.length} questions</div>
            </>}
        </div>
    )
}