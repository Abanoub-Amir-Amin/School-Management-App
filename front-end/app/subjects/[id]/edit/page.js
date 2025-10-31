import EditForm from "./editForm";
import styles from "../../../page.module.css";

export default async function EditSubjectPage(props) {
	const params = await props.params;
	const id = params.id;
	const res = await fetch(`http://localhost:3000/subject/${id}`, { cache: "no-store" });
	const subject = await res.json();
	console.log("Editing subject:", subject);
	return (
		<div className={styles.page}>
			<EditForm subject={subject} />
		</div>
	);
}
