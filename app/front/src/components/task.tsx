import Checkbox from "./form/Checkbox";
import "../styles/components/task.scss";
import { Button } from "./button";
import { MouseEventHandler } from "react";

export function Task(props: {
	id: string;
	label: string;
	description: string;
	checked: boolean;
	onDelete: MouseEventHandler<HTMLButtonElement>;
	onToggle: CallableFunction;
}) {
	return (
		<div className="task">
			<div className="task-header">
				<div className="task-header-content">
					<h4 className="task-label">{props.label}</h4>
					<p className="task-description">{props.description}</p>
				</div>
				<Checkbox id={props.id} name="task-completed" checked={props.checked} onChange={props.onToggle}></Checkbox>
			</div>
			<div className="task-footer">
				<div className="task-footer-content">
					<span className="task-date">Today</span>
					<span className="task-time">09:15 PM - 10:00 PM</span>
				</div>
				<Button type="button" label="Delete" style="danger" onClick={props.onDelete}></Button>
			</div>
		</div>
	);
}
