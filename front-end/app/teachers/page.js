import Link from "next/link";
import styles from "../page.module.css";
import DeleteButton from "./deleteButton";

export default async function TeachersPage() {
	const res = await fetch("http://localhost:3000/all-teachers", {
		cache: "no-store",
	});
	const teachers = await res.json();
	const teachersToDisplay = teachers.map((teacher) => (
		<li key={teacher.teacher_id}>
			{teacher.first_name} {teacher.last_name} - {teacher.email}
			<Link href={`/teachers/${teacher.teacher_id}`}>
				<button className={styles.button}>View</button>
			</Link>
			<Link href={`/teachers/${teacher.teacher_id}/edit`}>
				<button className={`${styles.edit_btn} ${styles.button}`}>Edit</button>
			</Link>
			<DeleteButton id={teacher.teacher_id} />
		</li>
	));
	// console.log(teachers);
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>
						Teachers Page{" "}
						<Link href="/teachers/addTeacher">
							<button className={styles.add_btn}>Add Teacher</button>
						</Link>
					</h1>
					<ul className={styles.list}>{teachersToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
