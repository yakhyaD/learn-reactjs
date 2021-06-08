const Keyboard = ({letter, letterEnter, feedback}) => {
    return (
        <div className='letter'
            style={{ "backgroundColor": feedback ? "gray" : "#17a2b8" }}
            onClick={() => letterEnter(letter)}
        >
            <span>{ letter }</span>
        </div>
    )
}
export default Keyboard
