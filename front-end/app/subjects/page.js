import Link from "next/link";
import styles from "../page.module.css";
import DeleteButton from "./deleteButton";

export default async function SubjectsPage() {
	const res = await fetch("http://localhost:3000/all-subjects", {
		cache: "no-store",
	});
	const subjects = await res.json();
	const subjectsToDisplay = subjects.map((subject) => (
		<li key={subject.subject_id}>
			{subject.subject_name} - {subject.description}
			<Link href={`/subjects/${subject.subject_id}`}>
				<button className={styles.button}>View</button>
			</Link>
			<Link href={`/subjects/${subject.subject_id}/edit`}>
				<button className={`${styles.edit_btn} ${styles.button}`}>Edit</button>
			</Link>
			<DeleteButton id={subject.subject_id} />
		</li>
	));
	// console.log(subjects);
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h1>
						Subjects Page{" "}
						<Link href="/subjects/addSubject">
							<button className={styles.add_btn}>Add subject</button>
						</Link>
					</h1>
					<ul className={styles.list}>{subjectsToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
