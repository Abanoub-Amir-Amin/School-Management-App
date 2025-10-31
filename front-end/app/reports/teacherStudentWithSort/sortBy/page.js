"use client";

import styles from "../../../page.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function StudentresultsComponent() {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const sortParams = useSearchParams();

	useEffect(() => {
		async function fetchResults() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(
					`http://localhost:3000/reports/teacher-students?sortBy=${sortParams.get(
						"sortBy"
					)}`,
					{
						cache: "no-store",
					}
				);

				if (!res.ok) {
					throw new Error("Failed to fetch results");
				}

				const data = await res.json();
				setResults(data);
			} catch (error) {
				console.error("Error fetching results:", error);
				setError("Failed to load results");
				setResults([]);
			} finally {
				setLoading(false);
			}
		}

		fetchResults();
	}, []);

	if (loading) {
		return <p>Loading results...</p>;
	}

	if (error) {
		return <p style={{ color: "red" }}>{error}</p>;
	}

	if (results.length === 0) {
		return <p>No results found for this teacher.</p>;
	}

	const resultsToDisplay =
		results.sortedBy === "teacher"
			? results.data.map((teacher) => (
					<li key={teacher.teacher_id}>
						<h3>Teacher Name: {teacher.teacher_name}</h3>
						<p>Teacher ID: {teacher.teacher_id}</p>
						<p>Subject: {teacher.subject}</p>

						<h4>Students:</h4>
						<ul>
							{teacher.students.map((student) => (
								<li key={student.student_id}>
									<p>Student Name: {student.student_name}</p>
									<p>Student ID: {student.student_id}</p>
									<p>Email: {student.email}</p>
									<p>Group: {student.group}</p>
									<p>
										Enrollment Date:{" "}
										{new Date(student.enrollment_date).toLocaleDateString()}
									</p>
								</li>
							))}
						</ul>
					</li>
			  ))
			: results.data.map((student) => (
					<li key={student.student_id}>
						<h3>Student Name: {student.student_name}</h3>
						<p>Student ID: {student.student_id}</p>
						<p>Email: {student.email}</p>

						<h4>Teachers:</h4>
						<ul>
							{student.teachers.map((teacher) => (
								<li key={teacher.teacher_id}>
									<p>Teacher Name: {teacher.teacher_name}</p>
									<p>Teacher ID: {teacher.teacher_id}</p>
									<p>Subject: {teacher.subject}</p>
									<p>Group: {teacher.group}</p>
									<p>
										Enrollment Date:{" "}
										{new Date(teacher.enrollment_date).toLocaleDateString()}
									</p>
								</li>
							))}
						</ul>
					</li>
			  ));

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.intro}>
					<h2>Results: </h2>
					<ul className={styles.list}>{resultsToDisplay}</ul>
				</div>
			</main>
		</div>
	);
}
