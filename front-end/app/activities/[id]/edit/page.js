import EditForm from "./editForm";
import styles from "../../../page.module.css";

export default async function EditActivityPage(props) {
	const params = await props.params;
	const id = params.id;
	const res = await fetch(`http://localhost:3000/activity/${id}`, { cache: "no-store" });
	const activity = await res.json();
	console.log("Editing activity:", activity);
	return (
		<div className={styles.page}>
			<EditForm activity={activity} />
		</div>
	);
}
