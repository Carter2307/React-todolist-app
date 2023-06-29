import { Header, Modal, Task, TaskList } from "./components";
import { useState } from "react";
import "./styles/main.scss";

export default function App() {
	//States
	const [show, setShow] = useState(false);
	const [tasks, setTasks] = useState([]);

	//Callback
	function addTask(task: Task) {
		setTasks((previousState: Task[]) => {
			return [...previousState, task];
		});

		setShow(false);
	}

	function deleteTask(id: string) {
		setTasks((tasks) => {
			return tasks.filter((task: Task) => task.id !== id);
		});
	}

	function toggleTask(id: string, checked: boolean) {
		setTasks((tasks) => {
			return tasks.map((task: Task) => {
				if (task.id === id) {
					return { ...task, checked };
				}

				return task;
			});
		});
	}

	//Render ui
	return (
		<div className="app">
			<div className="app-title">Today's Task</div>

			<div className="app-container">
				<Header openModal={() => setShow(true)}></Header>
				<TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask}></TaskList>
			</div>

			<Modal onClose={() => setShow(false)} show={show} onSubmit={addTask}></Modal>
		</div>
	);
}
