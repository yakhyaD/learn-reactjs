import React, { useState } from 'react';
import QuestionCard from './QuestionCard'
import {fetchQuizzQuestions, QuestionState } from '../API'
import { useHistory } from 'react-router';

const TOTAL_QUESTIONS = 10

export type answerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const GameStart = (props: any) => {
    
    const history = useHistory();
    const {category} = props.match.params
    const {level} = props.match.params
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<answerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)

    const startGame = async () => {
        setLoading(true)
        setGameOver(false)
        const newQuestions = await fetchQuizzQuestions(TOTAL_QUESTIONS, level, category)
        setQuestions(newQuestions)
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = (e: any) => {
        if(!gameOver){
        // useranswer
        const answer = e.currentTarget.value
        // Check if correct answer
        const correct = answer === questions[number].correct_answer
        // if correct increment score
        if(correct) setScore(score => score + 1)
        // save user answer
        const answerObject = {
            question: questions[number].question,
            answer,
            correct,
            correctAnswer: questions[number].correct_answer
        }
        setUserAnswers(prev=> [...prev, answerObject]) 

        }
    }

    const nextQuestion =  () => {
        const nextQ = number + 1
        if(nextQ === TOTAL_QUESTIONS){
        console.log('Game over')
        setGameOver(true)
        }
        else {
        setNumber(nextQ)
        }
    }
    return (
        <>
            {(gameOver || userAnswers.length === TOTAL_QUESTIONS) ? <button className='start' onClick={startGame}>
                {userAnswers.length === TOTAL_QUESTIONS ? "Play Again" : 'Start'}
            </button> : null}
            
            { !gameOver ? <p className='score'>Score: {score}</p> : null }
            {loading &&  <p>Loading Questions...</p> }
            { !loading && !gameOver && number !== TOTAL_QUESTIONS &&
            <QuestionCard
                questionNum={number+1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            }
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
                Next Question
            </button>) : null

            }
            {(!gameOver && userAnswers.length === TOTAL_QUESTIONS) ?
                (<div >
                    <button className='next' onClick={() => {history.push("/")}}>
                        Play another category
                    </button>
                    <button className='next' onClick={() => {history.push(`/${category}`)}}>
                        Change level
                    </button>
                </div>) : null
            }
        </>
    );
}
export default GameStart 