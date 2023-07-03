const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");

//EXPRESS CONFIG
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DATABSE CONNECTION
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("tasks.db");

function createDatabase() {
	db.serialize(() => {
		db.run(`CREATE TABLE tasks (id INTEGER,label VARCHAR(80),description TEXT,checked  BOOLEAN,create_at DATETIME)`);
	});
	db.close();
}

function clearDatabase(res) {
	db.serialize(() => {
		db.run(`DELETE FROM tasks WHERE id NOTNULL`, (err) => {
			if (err) {
				console.error(err);
				return;
			}

			res.send("Successfully clear database");
		});
	});
}

function getAllTaskInDataBase(res) {
	db.serialize(() => {
		db.all(`SELECT * FROM tasks`, (err, row) => {
			if (err) {
				console.log(err);
			}
			res.send(row);
		});
	});
}

function insertTaskOnDatabase(task, res) {
	db.serialize(() => {
		db.run(
			`INSERT INTO tasks (id, label, description, checked, create_at)
             VALUES('${task.id}', '${task.label}', '${task.description}', '${task.checked}', '${task.create_at}')`,
			(err) => {
				if (err) {
					console.error(err);
					return;
				}

				res.send("Succeffully add task to db");
			}
		);
	});
}

function updateTaskOnDatabase(task, res) {
	db.serialize(() => {
		db.run(
			`UPDATE tasks SET label='${task.label}', description='${task.description}', checked='${task.checked}' WHERE id='${task.id}';`,
			(err) => {
				if (err) {
					console.error(err);
					return;
				}

				res.send("Successfully Update" + task.label + "on database");
			}
		);
	});
}

function deleteTaskOnDatabase(id, res) {
	db.serialize(() => {
		db.run(`DELETE FROM tasks WHERE id='${id}'`, (err) => {
			if (err) {
				console.error(err);
				return;
			}

			res.send("Successfully Delete" + id + "on database");
		});
	});
}

app.get("/", (req, res) => {
	getAllTaskInDataBase(res);
});

app.post("/add", (req, res) => {
	const task = req.body;
	console.log(task);
	insertTaskOnDatabase(task, res);
});

app.post("/update/:id", (req, res) => {
	const id = req.params.id;
	const task = req.body;
	updateTaskOnDatabase(task, res);
});

app.post("/delete/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	deleteTaskOnDatabase(id, res);
});

app.listen(port, () => {
	console.log("Server start at : http://localhost:" + port);
});
