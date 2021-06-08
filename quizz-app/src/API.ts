export type Question = {
    category: string
    type: string
    difficulty: Difficulty
    question: string
    correct_answer: string
    incorrect_answers: string[]
}
export enum Difficulty  {

    EASY = "easy",
    MEDIUM = 'medium',
    HARD = "hard",
}
export type QuestionState = Question & {answers: string[]} 


export const fetchQuizzQuestions = async (amount: number, difficulty: Difficulty, category: number): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    
    const response = await fetch(endpoint)
    const data = await response.json()
    
    return data.results.map((question: Question) => ({
        ...question,
        answers:  shuffleAnswer([...question.incorrect_answers, question.correct_answer])
    }))
}
const shuffleAnswer = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5)
}
/* 
    General Knowledge https://opentdb.com/api.php?amount=10&category=9
    Science and Nature: https://opentdb.com/api.php?amount=10&category=17
    Science: Computers : https://opentdb.com/api.php?amount=10&category=18
    Science Mathematics: https://opentdb.com/api.php?amount=10&category=19
    Mythologie: https://opentdb.com/api.php?amount=10&category=20
    Sports: https://opentdb.com/api.php?amount=10&category=21
    Georgraphy: https://opentdb.com/api.php?amount=10&category=22
    History: https://opentdb.com/api.php?amount=10&category=23
    Politics: https://opentdb.com/api.php?amount=10&category=24
    Art: https://opentdb.com/api.php?amount=10&category=25
    Celebrities: https://opentdb.com/api.php?amount=10&category=26
    Animals: https://opentdb.com/api.php?amount=10&category=27
    Vehicules: https://opentdb.com/api.php?amount=10&category=28
    Science: Gadgets: https://opentdb.com/api.php?amount=10&category=30
    Entertainment Japanese Animes & Mangas : https://opentdb.com/api.php?amount=10&category=31
    Entertainment Cartoons & Animations: https://opentdb.com/api.php?amount=10&category=32
*/