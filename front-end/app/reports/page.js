import styles from "../../app/page.module.css";

export default function ReportsPage() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>Reports Page</h1>
					<div>
						<a href="/reports/groupsAssignedToTeacher" className={styles.card}>
							<h2>Student Groups assigned to specific teacher &rarr;</h2>
							<p>
								Gets student information of groups assigned to specific teacher.
							</p>
						</a>

						<a href="/reports/studentTeachers" className={styles.card}>
							<h2>Teachers assigned to specific student &rarr;</h2>
							<p>Gets teacher information of specific student.</p>
						</a>

						<a href="/reports/teacherStudentWithSort" className={styles.card}>
							<h2>Teachers - Students with sort &rarr;</h2>
							<p>
								Gets teachers along with their students, sorted by student names
								or teacher names.
							</p>
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
