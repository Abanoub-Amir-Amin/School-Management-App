"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../app/page.module.css";

export default function AddStudentGroupPage() {
    const router = useRouter();
	const [formData, setFormData] = useState({
		student_id: "",
		group_id: "",
		enrollment_date: "",
	});
	
	const [studentsData, setStudentsData] = useState([]);
	const [groupsData, setGroupsData] = useState([]);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const res = await fetch("http://localhost:3000/all-students", { cache: "no-store" });
				const data = await res.json();
				console.log("Fetched students:", data);

				setStudentsData(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error("Error fetching students:", error);
				setStudentsData([]); // fallback
			}
		};
		fetchStudents();
	}, []);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const res = await fetch("http://localhost:3000/all-groups", { cache: "no-store" });
				const data = await res.json();
				console.log("Fetched groups:", data);

				setGroupsData(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error("Error fetching groups:", error);
				setGroupsData([]); // fallback
			}
		};
		fetchGroups();
	}, []);

    function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

    async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/add-student-group`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to add student group");
			}

			alert("student group added successfully!");
			router.push("/studentGroups"); // Go back to student groups list
		} catch (err) {
			console.error(err);
			alert("Error adding student group");
		}
	}

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="datetime-local"
				name="enrollment_date"
				onChange={handleChange}
				placeholder="enrollment_date"
				className="border p-2 rounded"
			/>
			
            <select
				name="student_id"
				onChange={handleChange}
				className="border p-2 rounded"
			>
				<option value="">-- Select Student --</option>
				{Array.isArray(studentsData) &&
					studentsData.map((student) => (
						<option key={student.student_id} value={student.student_id}>
							{student.first_name} {student.last_name}
						</option>
					))}
			</select>
            
			<select
				name="group_id"
				onChange={handleChange}
				className="border p-2 rounded"
			>
				<option value="">-- Select Group --</option>
				{Array.isArray(groupsData) &&
					groupsData.map((group) => (
						<option key={group.group_id} value={group.group_id}>
							{group.group_name}
						</option>
					))}
			</select>

			
			<button type="submit" className={styles.button}>
				Add student group
			</button>
		</form>
        </div>
    );
}