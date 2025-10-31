"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../page.module.css";

export default function EditForm({ group }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		group_name: group.group_name || "",
		teacher_id: group.teacher_id || 0,
		schedule: group.schedule || "",
		capacity: group.capacity || 0,
	});
	const [teachersData, setTeachersData] = useState([]);

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const res = await fetch("http://localhost:3000/all-teachers", { cache: "no-store" });
				const data = await res.json();
				console.log("Fetched teachers:", data);

				setTeachersData(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error("Error fetching teachers:", error);
				setTeachersData([]); // fallback
			}
		};
		fetchTeachers();
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/update-group/${group.group_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error("Failed to update group");

			alert("Group updated successfully!");
			router.push("/groups");
		} catch (err) {
			console.error(err);
			alert("Error updating group");
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="group_name"
				value={formData.group_name}
				onChange={handleChange}
				placeholder="Group Name"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="schedule"
				value={formData.schedule}
				onChange={handleChange}
				placeholder="Schedule"
				className="border p-2 rounded"
			/>

			<input
				type="text"
				name="capacity"
				value={formData.capacity}
				onChange={handleChange}
				placeholder="Capacity"
				className="border p-2 rounded"
			/>
			
            <select
				name="teacher_id"
				value={formData.teacher_id}
				onChange={handleChange}
				className="border p-2 rounded"
			>
				{Array.isArray(teachersData) &&
					teachersData.map((teacher) => (
						<option key={teacher.teacher_id} value={teacher.teacher_id}>
							{teacher.first_name} {teacher.last_name}
						</option>
					))}
			</select>


			<button type="submit" className={styles.button}>
				Update Group
			</button>
		</form>
	);
}
