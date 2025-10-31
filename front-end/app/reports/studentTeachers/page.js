"use client";
import StudentTeachersComponent from "./studentTeachersComponent";
import { useState } from "react";
import styles from "../../page.module.css";

export default function TeachersAssignedToStudentPage() {
    
    const [formData, setFormData] = useState({
        studentId: "",
    });
    
    const [submittedStudentId, setSubmittedStudentId] = useState(null);
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Generating report for student ID:", formData.studentId);
        setSubmittedStudentId(formData.studentId);
    }
    
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>Teachers Assigned to Student Report</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label} htmlFor="studentId">Student ID:</label>
                        <input className={styles.input} type="text" id="studentId" name="studentId" onChange={handleChange} required />
                        <button className={styles.button} type="submit">Generate Report</button>
                    </form>

                    {submittedStudentId && <StudentTeachersComponent studentId={submittedStudentId} />}
                </div>
            </main>
        </div>
    );
}