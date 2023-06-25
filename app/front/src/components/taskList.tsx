import { Task } from "../components";

export function TaskList(props: { tasks: Tasks; toggleTask: CallableFunction; deleteTask: CallableFunction }) {
	return (
		<ul className="tasks-list">
			{props.tasks.length === 0 && "No task in you list today"}
			{props.tasks.map((task: Task) => {
				return (
					<li key={task.id}>
						<Task
							id={task.id}
							label={task.label}
							description={task.description}
							checked={task.checked}
							onToggle={props.toggleTask}
							onDelete={() => props.deleteTask(task.id)}
						></Task>
					</li>
				);
			})}
		</ul>
	);
}
