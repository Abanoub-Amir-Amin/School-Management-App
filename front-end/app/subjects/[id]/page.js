import styles from "../../page.module.css";

export default async function SubjectByIdPage(props) {
    const params = await props.params;
    const id = params.id;
    console.log("Fetching data for subject ID:", id);
    const res = await fetch(`http://localhost:3000/subject/${id}`, { 
        next: { revalidate: 10 },
        });
    const subject = await res.json();
    return (
        <div className={styles.page}>
            <div className={styles.intro}>
                <h1>Subject Page</h1>
                <p>Subject Name: {subject.subject_name}</p>
                <p>Subject Description: {subject.description}</p>
            </div>
        </div>
    );
}