const Button = ({showAddForm, showBtn}) => {
	return (
		<button className='btn' style={{ "backgroundColor": showBtn ? "red" : 'green'  }} onClick={showAddForm} >{showBtn ? 'Close' : 'Add'}</button>
	)
}

export default Button