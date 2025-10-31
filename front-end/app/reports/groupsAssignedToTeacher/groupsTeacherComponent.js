"use client";

import styles from "../../page.module.css";
import { useState, useEffect } from "react";

export default function GroupsTeacherComponent({ teacherId }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGroups() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:3000/reports/student-groups/${teacherId}`, {
                    cache: "no-store",
                });
                
                if (!res.ok) {
                    throw new Error("Failed to fetch groups");
                }
                
                const data = await res.json();
                setGroups(data);
            } catch (error) {
                console.error("Error fetching groups:", error);
                setError("Failed to load groups");
                setGroups([]);
            } finally {
                setLoading(false);
            }
        }
        
        fetchGroups();
    }, [teacherId]);

    if (loading) {
        return <p>Loading groups...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (groups.length === 0) {
        return <p>No groups found for this teacher.</p>;
    }

    const groupsToDisplay = groups.map((group) => (
        <li key={group.group_id}>
            <p>Student Name: {group.first_name} {group.last_name}</p>
            <p>Group Name: {group.group_name}</p>
            <p>Schedule: {group.schedule}</p>
        </li>
    ));

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h2>Groups for Teacher ID: {teacherId}</h2>
                    <ul className={styles.list}>{groupsToDisplay}</ul>
                </div>
            </main>
        </div>
    );
}