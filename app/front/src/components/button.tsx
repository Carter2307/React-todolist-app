import { MouseEventHandler } from "react";
import "../styles/components/button.scss";
export function Button(props: {
	type: "button" | "submit" | "reset" | undefined;
	label: string;
	style: string;
	icon?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
	let className = `button button-${props.style}`;

	if (props.icon) {
		return (
			<button type={props.type} onClick={props.onClick} className={className}>
				<i className={props.icon}></i>
				{props.label}
			</button>
		);
	}

	return (
		<button type={props.type} className={className} onClick={props.onClick}>
			{props.label}
		</button>
	);
}
