"use client";
import { useState } from "react";
import styles from "../../page.module.css";
import { useRouter } from "next/navigation";

export default function TeachersAssignedToStudentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        sortBy: "",
    });
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/reports/teacherStudentWithSort/sortBy?sortBy=${formData.sortBy}`);
    }
    
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>Teachers Assigned to Student Report</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label} htmlFor="studentId">Sort By:</label>
                        <select className={styles.select} id="sortBy" name="sortBy" onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        <button className={styles.button} type="submit">Generate Report</button>
                    </form>
                </div>
            </main>
        </div>
    );
}