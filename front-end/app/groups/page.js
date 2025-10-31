import Link from "next/link";
import styles from "../page.module.css";
import DeleteButton from "./deleteButton";

export default async function GroupsPage() {
	const res = await fetch("http://localhost:3000/all-groups", {
		cache: "no-store",
	});
	const groups = await res.json();
	const groupsToDisplay = groups.map((group) => (
		<li key={group.group_id}>
			<p>Group Name: {group.group_name}</p>
			<p>Teacher: {group.teacher_id}</p>
			<p>Schedule: {group.schedule}</p>
			<p>Capacity: {group.capacity}</p>
			<Link href={`/groups/${group.group_id}`}>
				<button className={styles.button}>View</button>
			</Link>
			<Link href={`/groups/${group.group_id}/edit`}>
				<button className={`${styles.edit_btn} ${styles.button}`}>Edit</button>
			</Link>
			<DeleteButton id={group.group_id} />
		</li>
	));
	// console.log(groups);
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>
						Groups Page{" "}
						<Link href="/groups/addGroup">
							<button className={styles.add_btn}>Add group</button>
						</Link>
					</h1>
					<ul className={styles.list}>{groupsToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
