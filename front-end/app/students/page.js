import Link from "next/link";
import styles from "../page.module.css";
import DeleteButton from "./deleteButton";

export default async function StudentsPage() {
	const res = await fetch("http://localhost:3000/all-students", {
		cache: "no-store",
	});
	const students = await res.json();
	const studentsToDisplay = students.map((student) => (
		<li key={student.student_id}>
			{student.first_name} {student.last_name} - {student.email}
			<Link href={`/students/${student.student_id}`}>
				<button className={styles.button}>View</button>
			</Link>
			<Link href={`/students/${student.student_id}/edit`}>
				<button className={`${styles.edit_btn} ${styles.button}`}>Edit</button>
			</Link>
			<DeleteButton id={student.student_id} />
		</li>
	));
	// console.log(students);
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>
						Students Page{" "}
						<Link href="/students/addStudent">
							<button className={styles.add_btn}>Add Student</button>
						</Link>
					</h1>
					<ul className={styles.list}>{studentsToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
