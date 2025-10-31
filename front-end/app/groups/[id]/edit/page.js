import EditForm from "./editForm";
import styles from "../../../page.module.css";

export default async function EditGroupPage(props) {
	const params = await props.params;
	const id = params.id;
	const res = await fetch(`http://localhost:3000/group/${id}`, { cache: "no-store" });
	const group = await res.json();
	console.log("Editing group:", group);
	return (
		<div className={styles.page}>
			<EditForm group={group} />
		</div>
	);
}
