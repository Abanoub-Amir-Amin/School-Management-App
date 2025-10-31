"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../app/page.module.css";

export default function AddTeacherPage() {
    const router = useRouter();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject_id: "",
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
			const res = await fetch(`http://localhost:3000/add-teacher`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to add teacher");
			}

			alert("teacher added successfully!");
			router.push("/teachers"); // Go back to teachers list
		} catch (err) {
			console.error(err);
			alert("Error adding teacher");
		}
	}

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="firstName"
				onChange={handleChange}
				placeholder="First Name"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="lastName"
				onChange={handleChange}
				placeholder="Last Name"
				className="border p-2 rounded"
			/>
			<input
				type="email"
				name="email"
				onChange={handleChange}
				placeholder="Email"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="phone"
				onChange={handleChange}
				placeholder="Phone Number"
				className="border p-2 rounded"
			/>
			
            <select
				name="subject_id"
				onChange={handleChange}
				className="border p-2 rounded"
			>
				<option value="">-- Select Subject --</option>
				{Array.isArray(subjectsData) &&
					subjectsData.map((subject) => (
						<option key={subject.subject_id} value={subject.subject_id}>
							{subject.subject_name}
						</option>
					))}
			</select>

			
			<button type="submit" className={styles.button}>
				Add teacher
			</button>
		</form>
        </div>
    );
}