import {useState} from 'react'
import './App.css';
import Keyboard from './components/Keyboard'
import GuessWord from './components/GuessWord';
import Result from './components/Result';


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allword = ["NOMBRE","GEANTE","CORAUX","ROULEAU","EJECTER","LIVRETS",
              "DIVISION","LICORNES","FOURNEAU","EMPLETTE","CLEPSYDRE","INDIGENES",
              "ECLATANTE","MATERIAUX","ANAGRAMME","ULTERIEURE","FACTORISER",
              "RACCROCHER","HIPPOPOTAME","SAUTERELLES"]

export default function App() {

  const [keyboard, setKeyboard] = useState([])
  const [guessWord, setGuessWord] = useState([])
  const [word, setWord] = useState([]);
  const [counter, setCounter] = useState(0);
  const [gameState, setGameState] = useState('start');
  const [result, setResult] = useState("");


  const  generateWords = () => {
    let randomIndex = Math.floor(Math.random()* allword.length)
    let randomWord = allword[randomIndex]
    const guess = randomWord.split('')
    setGuessWord(...guessWord, guess.map(letter => letter))
  }

  const generateKeyboard = () => {
    const keys = alphabet.split('')
    setKeyboard(...keyboard, keys.map(key => key))
  }

  const letterEnter = (newLetter) => {;
    setCounter(counter + 1)
    setWord([...word, newLetter])
    checkResult()
  }

  const verifyLetter = (letter) => (
    word.includes(letter)
  )

  const newGame = () => {
    if (gameState === 'start') {
      setGameState('en cours')
      setWord([])
      setGuessWord([])
      generateKeyboard()
      generateWords()
    }
  }
  const checkResult = () => {
    let result = guessWord.filter(element => (
      word.includes(element)
    )).length === guessWord.length
    if (result && counter <= 10) {
      setResult('You Win!!!')
      setGameState('start')
    } else if(counter < 10) {
      setResult("Game runnig!!!")
    } else {
      setResult("You Lose!!!")
      setGameState('start')
    }
  }

  return (
    <div className="Hangman">
      <div className="header">
        <h1 className="title">Jeu du pendu</h1>
        <button className="btn btn-info" disabled={gameState !== "start"} onClick={newGame}>Nouvelle Partie</button>
      </div>
      <Result result={result}/>
      <div className="guessWord">
        {
          guessWord.map((wordletter, index) => (
            <GuessWord
              key={index}
              wordletter={wordletter}
              feedback={verifyLetter(wordletter)}
            />
          ))

        }
      </div>

      <div className="keyboard">
        {keyboard.map((letter, index) =>
          <Keyboard
            key={index}
            letter={letter}
            letterEnter={letterEnter}
            feedback={verifyLetter(letter)}
          />)
        }
      </div>
    </div>
  );
}
