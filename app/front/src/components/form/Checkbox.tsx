import { useState } from "react";
import "../../styles/components/checkbox.scss";

export default function Checkbox(props: { id: string; name: string; checked: boolean; onChange: CallableFunction }) {
	const [checked, setChecked] = useState(false);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setChecked(e.target.checked);
		props.onChange(props.id, e.target.checked);
	};
	return (
		<div className="checkbox">
			<input type="checkbox" className="checkbox-input" name={props.name} id={props.id} checked={checked} onChange={handleChange} />
			<label className="checkbox-label" htmlFor={props.id}>
				<i className="ri-check-double-fill"></i>
			</label>
		</div>
	);
}
