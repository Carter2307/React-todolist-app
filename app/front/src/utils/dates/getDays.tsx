export function GetfullDay() {
	const days = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const date = {
		day: String(new Date().getDate()),
		week: String(days[new Date().getDay()]),
		month: String(months[new Date().getMonth()]),
	};
	return (
		<span className="date">
			{date.week}, {date.day} {date.month}
		</span>
	);
}
