import Link from "next/link";
import styles from "../page.module.css";
import DeleteButton from "./deleteButton";

export default async function ActivitiesPage() {
	const res = await fetch("http://localhost:3000/all-activities", {
		cache: "no-store",
	});
	const activities = await res.json();
	const activitiesToDisplay = activities.map((activity) => (
		<li key={activity.activity_id}>
			<p>Activity Name: {activity.activity_name}</p>
			<p>Description: {activity.description}</p>
			<p>Location: {activity.location}</p>
			<Link href={`/activities/${activity.activity_id}`}>
				<button className={styles.button}>View</button>
			</Link>
			<Link href={`/activities/${activity.activity_id}/edit`}>
				<button className={`${styles.edit_btn} ${styles.button}`}>Edit</button>
			</Link>
			<DeleteButton id={activity.activity_id} />
		</li>
	));
	// console.log(activities);
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>
						Activities Page{" "}
						<Link href="/activities/addActivity">
							<button className={styles.add_btn}>Add activity</button>
						</Link>
					</h1>
					<ul className={styles.list}>{activitiesToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
