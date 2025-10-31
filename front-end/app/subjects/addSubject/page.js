"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../app/page.module.css";

export default function AddSubjectPage() {
    const router = useRouter();
	const [formData, setFormData] = useState({
		subject_name: "",
		description: "",
	});
	
    function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

    async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/add-subject`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to add subject");
			}

			alert("subject added successfully!");
			router.push("/subjects"); // Go back to subjects list
		} catch (err) {
			console.error(err);
			alert("Error adding subject");
		}
	}

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="subject_name"
				onChange={handleChange}
				placeholder="Subject Name"
				className="border p-2 rounded"
			/>

			<textarea
				name="description"
				onChange={handleChange}
				placeholder="Description"
				className="border p-2 rounded"
			></textarea>
			
			<button type="submit" className={styles.button}>
				Add subject
			</button>
		</form>
        </div>
    );
}