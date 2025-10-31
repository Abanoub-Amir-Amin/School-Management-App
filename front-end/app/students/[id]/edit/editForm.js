"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../../page.module.css";

export default function EditForm({ student }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		first_name: student.first_name || "",
		last_name: student.last_name || "",
		email: student.email || "",
		phone: student.phone || "",
		date_of_birth: student.date_of_birth || "",
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/update-student/${student.student_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to update student");
			}

			alert("Student updated successfully!");
			router.push("/students"); // Go back to students list
		} catch (err) {
			console.error(err);
			alert("Error updating student");
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="first_name"
				value={formData.first_name}
				onChange={handleChange}
				placeholder="First Name"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="last_name"
				value={formData.last_name}
				onChange={handleChange}
				placeholder="Last Name"
				className="border p-2 rounded"
			/>
			<input
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Email"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="phone"
				value={formData.phone}
				onChange={handleChange}
				placeholder="Phone Number"
				className="border p-2 rounded"
			/>
			<input
				type="date"
				name="date_of_birth"
				value={formData.date_of_birth}
				onChange={handleChange}
				className="border p-2 rounded"
			/>
			<button type="submit" className={styles.button}>
				Update Student
			</button>
		</form>
	);
}
