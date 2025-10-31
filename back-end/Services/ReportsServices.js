const Report = require("../Repositories/Reports");

const report = new Report();

class ReportsServices {
    async studentGroupsAssignedToTeacher(teacher_id) {
        return await report.studentGroupsAssignedToTeacher(teacher_id);
    }
    async teachersAssignedToStudent(student_id) {
        return await report.teachersAssignedToStudent(student_id);
    }

    async getTeacherStudentReport(sortBy) {
        // Validate sort parameter
        const validSorts = ['teacher', 'student'];
        if (sortBy && !validSorts.includes(sortBy)) {
            throw new Error("Invalid sort parameter. Use 'teacher' or 'student'");
        }

        const data = await report.getTeacherStudentReport(sortBy);
        
        // Group data by teacher for better presentation
        return this.formatReportData(data, sortBy);
    }

    formatReportData(rows, sortBy) {
        if (sortBy === 'student') {
            // Group by student when sorting by student
            return this.groupByStudent(rows);
        } else {
            // Group by teacher when sorting by teacher (default)
            return this.groupByTeacher(rows);
        }
    }

    groupByTeacher(rows) {
        const teacherMap = new Map();

        rows.forEach(row => {
            const teacherKey = row.teacher_id;

            if (!teacherMap.has(teacherKey)) {
                teacherMap.set(teacherKey, {
                    teacher_id: row.teacher_id,
                    teacher_name: `${row.teacher_first_name} ${row.teacher_last_name}`,
                    subject: row.subject_name,
                    students: []
                });
            }

            teacherMap.get(teacherKey).students.push({
                student_id: row.student_id,
                student_name: `${row.student_first_name} ${row.student_last_name}`,
                email: row.student_email,
                group: row.group_name,
                enrollment_date: row.enrollment_date
            });
        });

        return Array.from(teacherMap.values());
    }

    groupByStudent(rows) {
        const studentMap = new Map();

        rows.forEach(row => {
            const studentKey = row.student_id;

            if (!studentMap.has(studentKey)) {
                studentMap.set(studentKey, {
                    student_id: row.student_id,
                    student_name: `${row.student_first_name} ${row.student_last_name}`,
                    email: row.student_email,
                    teachers: []
                });
            }

            studentMap.get(studentKey).teachers.push({
                teacher_id: row.teacher_id,
                teacher_name: `${row.teacher_first_name} ${row.teacher_last_name}`,
                subject: row.subject_name,
                group: row.group_name,
                enrollment_date: row.enrollment_date
            });
        });

        return Array.from(studentMap.values());
    }
}

module.exports = ReportsServices;