import styles from "../../page.module.css";

export default async function TeacherByIdPage(props) {
    const params = await props.params;
    const id = params.id;
    console.log("Fetching data for teacher ID:", id);
    const res = await fetch(`http://localhost:3000/teacher/${id}`, { 
        next: { revalidate: 10 },
        });
    const teacher = await res.json();
    console.log(teacher.first_name);
    return (
        <div className={styles.page}>
            <div className={styles.intro}>
                <h1>Teacher Page</h1>
                <p>First Name: {teacher.first_name}</p>
                <p>Last Name: {teacher.last_name}</p>
                <p>Email: {teacher.email}</p>
                <p>Phone Number: {teacher.phone}</p>
                <p>Subject ID: {teacher.subject_id}</p>
            </div>
        </div>
    );
}