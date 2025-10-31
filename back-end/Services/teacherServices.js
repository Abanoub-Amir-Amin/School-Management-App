const TeacherRepo = require('../Repositories/TeacherRepo');

const teacherRepo = new TeacherRepo();

class TeacherServices {

    async addTeacher(teacher){
        if(!teacher){
            throw new Error("Invalid teacher data");
        }
        return await teacherRepo.addTeacher(teacher);
    }
    
    async getAllTeachers(){
        return await teacherRepo.getAllTeachers();
    }
    
    async getTeacherById(id){
        const result = await teacherRepo.getTeacherById(id);
        if(result){
            return result;
        }
        else{
            return null;
        }
    }
    
    async deleteTeacher(id){
        const result = await teacherRepo.deleteTeacher(id);
        if(result){
            return result;
        }
        else{
            return null;
        }
    }
    
    async updateTeacher(id, teacher){
        if(!teacher){
            throw new Error("Invalid teacher data");
        }
        const result = await teacherRepo.updateTeacher(id, teacher);
        if(result){
            return result;
        }
        else{
            return null;
        }
    }
    

}    
module.exports = TeacherServices;
