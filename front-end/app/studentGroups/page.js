import Link from "next/link";
import styles from "../page.module.css";
import DeleteButton from "./deleteButton";

export default async function StudentGroupsPage() {
	const res = await fetch("http://localhost:3000/all-student-groups", {
		cache: "no-store",
	});
	const studentGroups = await res.json();
	const studentGroupsToDisplay = studentGroups.map((studentGroup) => (
		<li key={`${studentGroup.student_id} - ${studentGroup.group_id}`}>
			<p>{studentGroup.student_id} - {studentGroup.group_id}</p>
			<p>Enrollment Date: {studentGroup.enrollment_date}</p>
			<DeleteButton studentId={studentGroup.student_id} groupId={studentGroup.group_id} />
		</li>
	));
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>
						Student Groups Page{" "}
						<Link href="/studentGroups/addStudentGroup">
							<button className={styles.add_btn}>Add Student Group</button>
						</Link>
					</h1>
					<ul className={styles.list}>{studentGroupsToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
