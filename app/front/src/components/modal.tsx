import React from "react";
import { Button } from "./button";
import { FormEvent, MouseEventHandler, useState } from "react";
import "../styles/components/modal.scss";

export function Modal(props: { show: boolean; onClose: MouseEventHandler<HTMLButtonElement>; onSubmit: CallableFunction }) {
	const [values, setValues] = useState({
		label: "",
		description: "",
	});

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
		const name = e.target.name;
		setValues((oldValue) => {
			return { ...oldValue, [name]: e.target.value };
		});
	};

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (values.label === "" || values.description === "") return;

		props.onSubmit({ id: crypto.randomUUID(), label: values.label, description: values.description, checked: false });

		setValues({
			label: "",
			description: "",
		});
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
									name="label"
									id="task-label"
									value={values.label}
									placeholder="Task label"
									onChange={handleChange}
								></input>
							</div>
							<div className="modal-form-group">
								<label htmlFor="task-desc">Task description</label>
								<input
									type="text"
									name="description"
									id="task-desc"
									value={values.description}
									placeholder="Describe you task"
									onChange={handleChange}
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
			{JSON.stringify(values)}
		</div>
	);
}
