import React from 'react'
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'
import { answerObject } from './GameStart'

type Props = {
    question: string
    answers: string[]
    callback: any
    userAnswer: answerObject | undefined
    questionNum: number
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
    questionNum, 
    totalQuestions,
    question, 
    answers, 
    callback, 
    userAnswer 
}) => {
    return (
        <Wrapper>
            <p className='number'>
                Question: {questionNum} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers && answers.map((answer) => (
                    <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                    >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}
export default QuestionCard
