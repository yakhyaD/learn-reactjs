import {useState} from 'react'

const AddTask = ({ onAdd, showAdd }) => {

	const [text, setText] = useState('')
	const [day, setDay] = useState('')
	const [reminder, setReminder] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault();
		onAdd({ text, day, reminder })
		setText('')
		setDay('')
		setReminder(false)
	}
	return (
		<div>
			<form className='add-form' onSubmit={onSubmit} >
				<div className="form-control">
					<label>Task</label>
					<input
						type="text"
						placeholder='Add Task'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Day & Hour</label>
					<input
						type="text"
						placeholder='Task Date'
						value={day}
						onChange={(e) => setDay(e.target.value)}
					/>
				</div>
				<input type='submit' className="btn btn-block"
					value="Save Task" />
			</form>
		</div>
	)
}
export default AddTask