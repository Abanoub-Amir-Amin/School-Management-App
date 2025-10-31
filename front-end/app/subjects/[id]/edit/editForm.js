"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../page.module.css";

export default function EditForm({ subject }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		subject_name: subject.subject_name || "",
		description: subject.description || "",
	});
	
	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/update-subject/${subject.subject_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error("Failed to update subject");

			alert("subject updated successfully!");
			router.push("/subjects");
		} catch (err) {
			console.error(err);
			alert("Error updating subject");
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="subject_name"
				value={formData.subject_name}
				onChange={handleChange}
				placeholder="Subject Name"
				className="border p-2 rounded"
			/>

			<textarea
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Description"
				className="border p-2 rounded"
			></textarea>

			<button type="submit" className={styles.button}>
				Update subject
			</button>
		</form>
	);
}
