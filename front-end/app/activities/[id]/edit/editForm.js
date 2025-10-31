"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../page.module.css";

export default function EditForm({ activity }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		group_id: activity.group_id || 0,
        activity_name: activity.activity_name || "",
        description: activity.description || "",
        scheduled_time: activity.scheduled_time || "",
        duration_minutes: activity.duration_minutes || 0,
        location: activity.location || "",
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
			const res = await fetch(`http://localhost:3000/update-activity/${activity.activity_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error("Failed to update activity");

			alert("activity updated successfully!");
			router.push("/activities");
		} catch (err) {
			console.error(err);
			alert("Error updating activity");
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				name="activity_name"
				value={formData.activity_name}
				onChange={handleChange}
				placeholder="Activity Name"
				className="border p-2 rounded"
			/>
			<textarea
				type="text"
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Description"
				className="border p-2 rounded"
			/>
			<input
				type="date"
				name="scheduled_time"
				value={formData.scheduled_time}
				onChange={handleChange}
				placeholder="Scheduled Time"
				className="border p-2 rounded"
			/>
			<input
				type="number"
				name="duration_minutes"
				value={formData.duration_minutes}
				onChange={handleChange}
				placeholder="Duration (minutes)"
				min="0"
				max="120"
				className="border p-2 rounded"
			/>
			<input
				type="text"
				name="location"
				value={formData.location}
				onChange={handleChange}
				placeholder="Location"
				className="border p-2 rounded"
			/>
            <select
				name="group_id"
				value={formData.group_id}
				onChange={handleChange}
				className="border p-2 rounded"
			>
				{Array.isArray(groupsData) &&
					groupsData.map((group) => (
						<option key={group.group_id} value={group.group_id}>
							{group.group_name}
						</option>
					))}
			</select>

			<button type="submit" className={styles.button}>
				Update activity
			</button>
		</form>
	);
}
