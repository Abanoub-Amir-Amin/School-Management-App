const { connectToDB } = require("../Services/connectToDB");
const { closeDB } = require("../Services/connectToDB");

class Reports {
	async studentGroupsAssignedToTeacher(teacher_id) {
		try {
			
			const result = await client.query(
				`select s.first_name, s.last_name, g.group_name, g.schedule
                from student s
                inner join student_group sg
                on sg.student_id = s.student_id
                inner join "group" g
                on sg.group_id = g.group_id
                where g.teacher_id = $1`,
				[teacher_id]
			);
			
			return result.rows;
		} catch (err) {
			console.error("Error generating report:", err);
			throw err;
		}
	}

	async teachersAssignedToStudent(student_id) {
		try {
			
			const result = await client.query(
				`
                select *
                from teacher t
                inner join "group" g
                on g.teacher_id = t.teacher_id
                inner join student_group sg
                on sg.group_id = g.group_id
                where sg.student_id = $1
                `,
				[student_id]
			);
			
			return result.rows;
		} catch (err) {
			console.error("Error generating report:", err);
			throw err;
		}
	}

	async getTeacherStudentReport(sortBy = 'teacher') {
        let orderClause;
        
        // Determine sorting based on parameter
        switch(sortBy) {
            case 'student':
                orderClause = 'st.last_name, st.first_name, t.last_name, t.first_name';
                break;
            case 'teacher':
            default:
                orderClause = 't.last_name, t.first_name, st.last_name, st.first_name';
                break;
        }

        const query = `
            SELECT 
                t.teacher_id,
                t.first_name AS teacher_first_name,
                t.last_name AS teacher_last_name,
                s.subject_name,
                g.group_id,
                g.group_name,
                st.student_id,
                st.first_name AS student_first_name,
                st.last_name AS student_last_name,
                st.email AS student_email,
                sg.enrollment_date
            FROM teacher t
            JOIN subject s ON t.subject_id = s.subject_id
            JOIN "group" g ON t.teacher_id = g.teacher_id
            JOIN student_group sg ON g.group_id = sg.group_id
            JOIN student st ON sg.student_id = st.student_id
            ORDER BY ${orderClause}
        `;

        try {
			
            const result = await client.query(query);
			
            return result.rows;
        } catch (err) {
            console.error('Error fetching teacher-student report:', err);
            throw err;
        }
	}
}

module.exports = Reports;
