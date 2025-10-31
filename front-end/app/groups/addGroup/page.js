"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../app/page.module.css";

export default function AddGroupPage() {
    const router = useRouter();
	const [formData, setFormData] = useState({
		group_name: "",
		teacher_id: 0,
		schedule: "",
		capacity: 0,
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
			const res = await fetch(`http://localhost:3000/add-group`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to add group");
			}

			alert("group added successfully!");
			router.push("/groups"); // Go back to groups list
		} catch (err) {
			console.error(err);
			alert("Error adding group");
		}
	}

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="group_name"
				onChange={handleChange}
				placeholder="Group Name"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="schedule"
				onChange={handleChange}
				placeholder="Schedule"
				className="border p-2 rounded"
			/>

			<input
				type="text"
				name="capacity"
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
				<option value="">-- Select teacher --</option>
				{Array.isArray(teachersData) &&
					teachersData.map((teacher) => (
						<option key={teacher.teacher_id} value={teacher.teacher_id}>
							{teacher.first_name} {teacher.last_name}
						</option>
					))}
			</select>

			
			<button type="submit" className={styles.button}>
				Add group
			</button>
		</form>
        </div>
    );
}