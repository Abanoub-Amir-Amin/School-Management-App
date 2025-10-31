"use client";

import styles from "../../page.module.css";
import { useState, useEffect } from "react";

export default function StudentTeachersComponent({ studentId }) {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeachers() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:3000/reports/teachers-assigned/${studentId}`, {
                    cache: "no-store",
                });
                
                if (!res.ok) {
                    throw new Error("Failed to fetch teachers");
                }
                
                const data = await res.json();
                setTeachers(data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
                setError("Failed to load teachers");
                setTeachers([]);
            } finally {
                setLoading(false);
            }
        }
        
        fetchTeachers();
    }, [studentId]);

    if (loading) {
        return <p>Loading teachers...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (teachers.length === 0) {
        return <p>No teachers found for this teacher.</p>;
    }

    const teachersToDisplay = teachers.map((teacher) => (
        <li key={teacher.teacher_id}>
            <p>Teacher Name: {teacher.first_name} {teacher.last_name}</p>
            <p>Subject ID: {teacher.subject_id}</p>
            <p>Email: {teacher.email}</p>
            <p>Phone: {teacher.phone}</p>
            <p>Group ID: {teacher.group_id}</p>
            <p>Group Name: {teacher.group_name}</p>
            <p>Schedule: {teacher.schedule}</p>
            <p>Capacity: {teacher.capacity}</p>
        </li>
    ));

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h2>Teachers for Student ID: {studentId}</h2>
                    <ul className={styles.list}>{teachersToDisplay}</ul>
                </div>
            </main>
        </div>
    );
}