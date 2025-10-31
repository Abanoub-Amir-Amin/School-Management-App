"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../app/page.module.css";

export default function AddActivityPage() {
    const router = useRouter();
	const [formData, setFormData] = useState({
        group_id: 0,
        activity_name: "",
        description: "",
        scheduled_time: "",
        duration_minutes: 0,
        location: "",
	});
	
	const [groupsData, setGroupsData] = useState([]);

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
			const res = await fetch(`http://localhost:3000/add-activity`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to add activity");
			}

			alert("activity added successfully!");
			router.push("/activities"); // Go back to activities list
		} catch (err) {
			console.error(err);
			alert("Error adding activity");
		}
	}

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="activity_name"
				onChange={handleChange}
				placeholder="Activity Name"
				className="border p-2 rounded"
			/>
			<textarea
				type="text"
				name="description"
				onChange={handleChange}
				placeholder="Description"
				className="border p-2 rounded"
			/>
			<input
				type="date"
				name="scheduled_time"
				onChange={handleChange}
				placeholder="Scheduled Time"
				className="border p-2 rounded"
			/>
			<input
				type="number"
				name="duration_minutes"
				onChange={handleChange}
				placeholder="Duration (minutes)"
				min="0"
				max="120"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="location"
				onChange={handleChange}
				placeholder="Location"
				className="border p-2 rounded"
			/>
            <select
				name="group_id"
				onChange={handleChange}
				className="border p-2 rounded"
			>
				<option value="">-- Select group --</option>
				{Array.isArray(groupsData) &&
					groupsData.map((group) => (
						<option key={group.group_id} value={group.group_id}>
							{group.group_name}
						</option>
					))}
			</select>

			
			<button type="submit" className={styles.button}>
				Add activity
			</button>
		</form>
        </div>
    );
}