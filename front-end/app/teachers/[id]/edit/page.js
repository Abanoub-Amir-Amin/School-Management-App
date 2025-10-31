import EditForm from "./editForm";
import styles from "../../../page.module.css";

export default async function EditTeacherPage(props) {
	const params = await props.params;
	const id = params.id;
	const res = await fetch(`http://localhost:3000/teacher/${id}`, { cache: "no-store" });
	const teacher = await res.json();
	console.log("Editing teacher:", teacher);
	return (
		<div className={styles.page}>
			<EditForm teacher={teacher} />
		</div>
	);
}
