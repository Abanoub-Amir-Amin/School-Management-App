import EditForm from "./editForm";
import styles from "../../../page.module.css";

export default async function EditStudentPage(props) {
	const params = await props.params;
	const id = params.id;
	const res = await fetch(`http://localhost:3000/student/${id}`, { cache: "no-store" });
	const student = await res.json();
	console.log("Editing student:", student);
	return (
		<div className={styles.page}>
			<EditForm student={student} />
		</div>
	);
}
