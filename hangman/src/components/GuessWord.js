const GuessWord = ({ wordletter, feedback }) => {
    const HIDDEN_LETTER = '_'
    return (
        <div className='guessLetter'>
            <h3>{feedback ? wordletter : HIDDEN_LETTER}</h3>
        </div>
    )
}
export default GuessWord
