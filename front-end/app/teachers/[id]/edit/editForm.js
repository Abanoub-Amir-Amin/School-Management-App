"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../page.module.css";

export default function EditForm({ teacher }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		first_name: teacher.first_name || "",
		last_name: teacher.last_name || "",
		email: teacher.email || "",
		phone: teacher.phone || "",
		subject_id: teacher.subject_id || "",
	});
	const [subjectsData, setSubjectsData] = useState([]);

	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				const res = await fetch("http://localhost:3000/all-subjects", { cache: "no-store" });
				const data = await res.json();
				console.log("Fetched subjects:", data);

				setSubjectsData(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error("Error fetching subjects:", error);
				setSubjectsData([]); // fallback
			}
		};
		fetchSubjects();
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/update-teacher/${teacher.teacher_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error("Failed to update teacher");

			alert("Teacher updated successfully!");
			router.push("/teachers");
		} catch (err) {
			console.error(err);
			alert("Error updating teacher");
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

			<select
				name="subject_id"
				value={formData.subject_id}
				onChange={handleChange}
				className="border p-2 rounded"
			>
				{Array.isArray(subjectsData) &&
					subjectsData.map((subject) => (
						<option key={subject.subject_id} value={subject.subject_id}>
							{subject.subject_name}
						</option>
					))}
			</select>

			<button type="submit" className={styles.button}>
				Update Teacher
			</button>
		</form>
	);
}
