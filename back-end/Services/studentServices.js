const StudentRepo = require('../Repositories/StudentRepo');

const studentRepo = new StudentRepo();

class StudentServices {

    async addStudent(student){
        return await studentRepo.addStudent(student);
    }
    async getAllStudents() {
        return await studentRepo.getAllStudents();
    }
    async getStudentById(id) {
        return await studentRepo.getStudentById(id);
    }
    async updateStudent(id, student) {
        return await studentRepo.updateStudent(id, student);
    }
    async deleteStudent(id) {
        return await studentRepo.deleteStudent(id);
    }
}

module.exports = StudentServices;