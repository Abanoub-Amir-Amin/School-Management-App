import styles from "../../page.module.css";

export default async function StudentByIdPage(props) {
    const params = await props.params;
    const id = params.id;
    console.log("Fetching data for student ID:", id);
    const res = await fetch(`http://localhost:3000/student/${id}`, { 
        next: { revalidate: 10 },
        });
    const student = await res.json();
    console.log(student.first_name);
    return (
        <div className={styles.page}>
            <div className={styles.intro}>
                <h1>Student Page</h1>
                <p>First Name: {student.first_name}</p>
                <p>Last Name: {student.last_name}</p>
                <p>Email: {student.email}</p>
                <p>Phone Number: {student.phone}</p>
                <p>Date of Birth: {student.date_of_birth}</p>
            </div>
        </div>
    );
}