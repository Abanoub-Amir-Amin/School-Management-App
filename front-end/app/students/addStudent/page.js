"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../app/page.module.css";

export default function AddStudentPage() {
    const router = useRouter();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		date_of_birth: "",
	});

    function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

    async function handleSubmit(e) {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			const res = await fetch(`http://localhost:3000/add-student`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to add student");
			}

			alert("student added successfully!");
			router.push("/students"); // Go back to students list
		} catch (err) {
			console.error(err);
			alert("Error adding student");
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
                placeholder="Date of Birth"
                className="border p-2 rounded"
            />
			
			<button type="submit" className={styles.button}>
				Add student
			</button>
		</form>
        </div>
    );
}