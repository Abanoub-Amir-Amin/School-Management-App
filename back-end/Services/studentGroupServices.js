const StudentGroupRepo = require("../Repositories/StudentGroupRepo");

const studentGroupRepo = new StudentGroupRepo();

class StudentGroupServices {
    async addStudentGroup(studentGroup) {
        return await studentGroupRepo.addStudentGroup(studentGroup);
    }

    async getAllStudentGroups() {
        return await studentGroupRepo.getAllStudentGroups();
    }

    async deleteStudentGroup(student_id, group_id) {
        return await studentGroupRepo.deleteStudentGroup(student_id, group_id);
    }
}

module.exports = StudentGroupServices;