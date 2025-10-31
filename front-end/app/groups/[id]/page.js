import styles from "../../page.module.css";

export default async function GroupByIdPage(props) {
	const params = await props.params;
	const id = params.id;
	console.log("Fetching data for group ID:", id);
	const res = await fetch(`http://localhost:3000/group/${id}`, {
		next: { revalidate: 10 },
	});
	const group = await res.json();
	console.log(group.first_name);
	return (
		<div className={styles.page}>
			<div className={styles.intro}>
				<h1>Group Page</h1>
				<p>Group Name: {group.group_name}</p>
				<p>Teacher: {group.teacher_id}</p>
				<p>Schedule: {group.schedule}</p>
				<p>Capacity: {group.capacity}</p>
			</div>
		</div>
	);
}
