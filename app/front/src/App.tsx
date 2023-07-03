import { Header, Modal, TaskList } from "./components";
import { useEffect, useState } from "react";
import "./styles/main.scss";

export default function App() {
	//States
	const urls = {
		all: "http://localhost:3000",
		add: "http://localhost:3000/add",
		update: "http://localhost:3000/update/",
		delete: "http://localhost:3000/delete/",
	};
	const [show, setShow] = useState(false);
	const [tasks, setTasks] = useState<Tasks>([]);

	//Fetch data from SQLITE data
	useEffect(() => {
		getDatas(urls.all);
	}, []);

	async function deleteTaskToDB(id: string) {
		fetch(`${urls.delete}${id}`, { method: "POST" }).then((response) => {
			if (response.ok) {
				console.log("successfully delete");
			}
		});
	}

	async function updateTaskToDatabase(id: string, value: string) {
		const body: BodyInit = JSON.stringify({ label: value });
		console.log(body);
		const option: RequestInit = {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body,
		};
		const response = await fetch(`${urls.update}${id}`, option);
		if (response.ok) {
			getDatas(urls.all);
		}
	}

	async function addTaskToDB(task: Task) {
		const body: BodyInit = JSON.stringify({ ...task, create_at: Date.now() });
		console.log(body);
		const option: RequestInit = {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body,
		};
		const response = await fetch(urls.add, option);
		if (response.ok) {
			getDatas(urls.all);
		}
	}

	//Fetch datas form database
	async function getDatas(url: string) {
		const option: RequestInit = { method: "GET", mode: "cors" };
		const response = await fetch(url, option);
		if (response.ok) {
			setTasks(await response.json());
		}
	}

	//Callback
	function addTask(task: Task) {
		setTasks((previousState) => {
			return [...previousState, task];
		});

		addTaskToDB(task);
		setShow(false);
	}

	function deleteTask(id: string) {
		setTasks((tasks) => {
			return tasks.filter((task: Task) => task.id !== id);
		});

		deleteTaskToDB(id);
	}

	function toggleTask(id: string, checked: string) {
		setTasks((todos: Task[]) => {
			return todos.map((task: Task) => {
				if (task.id && task.id === id) {
					task.checked = checked;
				}

				return task;
			});
		});
		updateTaskToDatabase(id, checked);
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
