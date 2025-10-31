import styles from "../../page.module.css";

export default async function ActivityByIdPage(props) {
	const params = await props.params;
	const id = params.id;
	console.log("Fetching data for activity ID:", id);
	const res = await fetch(`http://localhost:3000/activity/${id}`, {
		next: { revalidate: 10 },
	});
	const activity = await res.json();
	return (
		<div className={styles.page}>
			<div className={styles.intro}>
				<h1>Activity Page</h1>
				<p>Activity Name: {activity.activity_name}</p>
				<p>Description: {activity.description}</p>
				<p>Group: {activity.group_id}</p>
				<p>Duration: {activity.duration_minutes}</p>
				<p>Schduled Date: {activity.scheduled_time}</p>
				<p>Location: {activity.location}</p>
			</div>
		</div>
	);
}
