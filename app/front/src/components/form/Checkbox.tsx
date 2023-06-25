import { ChangeEvent, ChangeEventHandler } from "react";
import "../../styles/components/checkbox.scss";

export default function Checkbox(props: { id: string; name: string; checked: boolean; onChange: CallableFunction }) {
	return (
		<div className="checkbox">
			<input
				type="checkbox"
				className="checkbox-input"
				name={props.name}
				id={props.id}
				checked={props.checked}
				onChange={(e) => props.onChange(props.id, e.target.checked)}
			/>
			<label className="checkbox-label" htmlFor={props.id}>
				<i className="ri-check-double-fill"></i>
			</label>
		</div>
	);
}
