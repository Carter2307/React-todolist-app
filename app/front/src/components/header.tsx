import { Button } from "./button";
import { GetfullDay } from "../utils/dates";
import "../styles/components/header.scss";

export function Header(props: { openModal: CallableFunction }) {
	return (
		<header className="header">
			<div className="header-content">
				<h3>Today's Task</h3>
				<GetfullDay></GetfullDay>
			</div>

			<Button
				type="button"
				label="New Task"
				style="primary"
				icon="ri-add-line"
				onClick={() => {
					props.openModal();
				}}
			></Button>
		</header>
	);
}
