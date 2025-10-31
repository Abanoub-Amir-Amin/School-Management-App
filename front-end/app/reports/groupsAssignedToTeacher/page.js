"use client";
import GroupsTeacherComponent from "./groupsTeacherComponent";
import { useState } from "react";
import styles from "../../page.module.css";

export default function GroupsAssignedToTeacherPage() {
    
    const [formData, setFormData] = useState({
        teacherId: "",
    });
    
    const [submittedTeacherId, setSubmittedTeacherId] = useState(null);
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Generating report for teacher ID:", formData.teacherId);
        setSubmittedTeacherId(formData.teacherId);
    }
    
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>Groups Assigned to Teacher Report</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label} htmlFor="teacherId">Teacher ID:</label>
                        <input className={styles.input} type="text" id="teacherId" name="teacherId" onChange={handleChange} required />
                        <button className={styles.button} type="submit">Generate Report</button>
                    </form>

                    {submittedTeacherId && <GroupsTeacherComponent teacherId={submittedTeacherId} />}
                </div>
            </main>
        </div>
    );
}