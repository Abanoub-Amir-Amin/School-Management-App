"use client";

import styles from "../page.module.css";

export default function DeleteButton({ id }) {
	async function handleDelete() {
        console.log(id)
        try {
			const res = await fetch(`http://localhost:3000/delete-activity/${id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			console.log("Deleted:", data);
			// optionally reload the page
			window.location.reload();
		} catch (error) {
			console.error("Error deleting activity:", error);
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
