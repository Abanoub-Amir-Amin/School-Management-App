import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>Welcome to School Management App</h1>
					<p>There is alot to do in this app, Choose a feature from below.</p>
          <div>
            <a href="/students" className={styles.card}>
              <h2>Students &rarr;</h2>
              <p>Manage student records, enrollment, and performance tracking.</p>
            </a>

            <a href="/teachers" className={styles.card}>
              <h2>Teachers &rarr;</h2>
              <p>Handle teacher profiles, schedules, and assignments.</p>
            </a>

            <a href="/subjects" className={styles.card}>
              <h2>Subjects &rarr;</h2>
              <p>Create and manage subject catalogs, assignments, and grading.</p>
            </a>

            <a href="/groups" className={styles.card}>
              <h2>Groups &rarr;</h2>
              <p>Manage student groups, and class schedules.</p>
            </a>
            <a href="/activities" className={styles.card}>
              <h2>Activities &rarr;</h2>
              <p>Organize and schedule activities for students and teachers.</p>
            </a>
            <a href="/studentGroups" className={styles.card}>
              <h2>Assign students to groups &rarr;</h2>
              <p>Assign students to groups based on their performance.</p>
            </a>
            <a href="/reports" className={styles.card}>
              <h2>Reports &rarr;</h2>
              <p>Generate reports on student and teacher.</p>
            </a>
          </div>
				</div>
			</main>
		</div>
	);
}
