const SubjectRepo = require("../Repositories/SubjectRepo");

const subjectRepo = new SubjectRepo();

class SubjectService {
	async getAllSubjects() {
		return await subjectRepo.getAllSubjects();
	}

	async getSubjectById(subjectId) {
		return await subjectRepo.getSubjectById(subjectId);
	}

	async addSubject(subject) {
		return await subjectRepo.addSubject(subject);
	}

	async updateSubject(subjectId, subject) {
		return await subjectRepo.updateSubject(subjectId, subject);
	}

	async deleteSubject(subjectId) {
		return await subjectRepo.deleteSubject(subjectId);
	}
}

module.exports = SubjectService;
