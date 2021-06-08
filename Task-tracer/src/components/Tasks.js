import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
	return (
		<div>
			{tasks.map((task, index) =>  
				<Task
					task={task} key={index}
					onDelete={onDelete}
					onToggle={onToggle}
				/>
			)}
		</div>
	)
}
export default Tasks