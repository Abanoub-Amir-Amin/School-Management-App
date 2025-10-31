"use client";

import styles from "../page.module.css";

export default function DeleteButton({ studentId, groupId }) {
	async function handleDelete() {
		console.log(studentId, groupId);
        try {
			const res = await fetch(`http://localhost:3000/delete-student-group/${studentId}/${groupId}`, {
				method: "DELETE",
			});
			const data = await res.json();
			console.log("Deleted:", data);
			// optionally reload the page
			window.location.reload();
		} catch (error) {
			console.error("Error student group:", error);
		}
	}

	return (
		<button
			className={`${styles.delete_btn} ${styles.button}`}
			onClick={handleDelete}
		>
			Delete
		</button>
	);
}
