import { Button } from "./button";
import { FormEvent, FormEventHandler, MouseEventHandler, useState } from "react";
import "../styles/components/modal.scss";

export function Modal(props: { show: boolean; onClose: MouseEventHandler<HTMLButtonElement>; onSubmit: CallableFunction }) {
	const [label, setLabel] = useState("");
	const [description, setDesc] = useState("");

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (label === "" || description === "") return;

		props.onSubmit({ id: crypto.randomUUID(), label, description, checked: false });

		setLabel("");
		setDesc("");
	}

	return (
		<div className="modal" data-modal-visible={String(props.show)}>
			<div className="modal-container">
				<div className="modal-header">
					<span className="modal-header-title">Create new task</span>
					<button type="button" className="button-icon" onClick={props.onClose}>
						<i className="ri-close-line"></i>
					</button>
				</div>
				<div className="modal-content">
					<form action="" className="modal-form" onSubmit={handleSubmit}>
						<div className="modal-form-content">
							<div className="modal-form-group">
								<label htmlFor="task-label">Task label</label>
								<input
									type="text"
									name="task-label"
									id="task-label"
									value={label}
									placeholder="Task label"
									onChange={(e) => setLabel(e.target.value)}
								></input>
							</div>
							<div className="modal-form-group">
								<label htmlFor="task-desc">Task description</label>
								<input
									type="text"
									name="task-description"
									id="task-desc"
									value={description}
									placeholder="Describe you task"
									onChange={(e) => setDesc(e.target.value)}
								></input>
							</div>
						</div>
						<div className="modal-actions">
							<Button type="button" label="Cancel" style="secondary" onClick={props.onClose}></Button>
							<Button type="submit" label="Create" style="primary"></Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
