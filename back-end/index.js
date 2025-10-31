const cors = require("cors");
const express = require("express");
const TeacherServices = require("./Services/teacherServices");
const StudentServices = require("./Services/studentServices");
const SubjectService = require("./Services/subjectService");
const GroupServices = require("./Services/groupServices");
const ActivityServices = require("./Services/activityServices");
const StudentGroupServices = require("./Services/studentGroupServices");
const ReportsServices = require("./Services/ReportsServices");

const { connectToDB } = require("./Services/connectToDB");
const { closeDB } = require("./Services/connectToDB");

const app = express();
const port = 3000;

const teacherServices = new TeacherServices();
const studentServices = new StudentServices();
const subjectServices = new SubjectService();
const groupServices = new GroupServices();
const activityServices = new ActivityServices();
const studentGroupServices = new StudentGroupServices();
const reportServices = new ReportsServices();

app.use(cors({ origin: "*" }));


// ---------------Teacher CRUD Endpoints----------------
app.get("/all-teachers", async (req, res) => {
	try {
		const result = await teacherServices.getAllTeachers();
		res.json(result); // Use res.json() for JSON responses
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch teachers" });
	}
});

app.get("/teacher/:id", async (req, res) => {
	try {
		const teacherId = req.params.id;
		const result = await teacherServices.getTeacherById(teacherId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Teacher not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch teacher" });
	}
});

app.post("/add-teacher", express.json(), async (req, res) => {
	try {
		const newTeacher = req.body;
		const result = await teacherServices.addTeacher(newTeacher);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to add teacher" });
	}
});

app.put("/update-teacher/:id", express.json(), async (req, res) => {
	try {
		const teacherId = req.params.id;
		const updatedTeacher = req.body;
		const result = await teacherServices.updateTeacher(
			teacherId,
			updatedTeacher
		);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Teacher not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update teacher" });
	}
});

app.delete("/delete-teacher/:id", async (req, res) => {
	try {
		const teacherId = req.params.id;
		const result = await teacherServices.deleteTeacher(teacherId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Teacher not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete teacher" });
	}
});

// ---------------Student CRUD Endpoints----------------
app.get("/all-students", async (req, res) => {
	try {
		const result = await studentServices.getAllStudents();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch students" });
	}
});

app.get("/student/:id", async (req, res) => {
	try {
		const studentId = req.params.id;
		const result = await studentServices.getStudentById(studentId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Student not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch student" });
	}
});

app.post("/add-student", express.json(), async (req, res) => {
	const newStudent = req.body;
	try {
		const result = await studentServices.addStudent(newStudent);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to add student" });
	}
});

app.put("/update-student/:id", express.json(), async (req, res) => {
	const studentId = req.params.id;
	const updatedStudent = req.body;
	try {
		const result = await studentServices.updateStudent(
			studentId,
			updatedStudent
		);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Student not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update student" });
	}
});

app.delete("/delete-student/:id", async (req, res) => {
	const studentId = req.params.id;
	try {
		const result = await studentServices.deleteStudent(studentId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Student not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete student" });
	}
});

// ---------------Subject CRUD Endpoints----------------
app.get("/all-subjects", async (req, res) => {
	try {
		const result = await subjectServices.getAllSubjects();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch subjects" });
	}
});

app.get("/subject/:id", async (req, res) => {
	try {
		const subjectId = req.params.id;
		const result = await subjectServices.getSubjectById(subjectId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Subject not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch subject" });
	}
});

app.post("/add-subject", express.json(), async (req, res) => {
	const newSubject = req.body;
	try {
		const result = await subjectServices.addSubject(newSubject);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to add subject" });
	}
});

app.put("/update-subject/:id", express.json(), async (req, res) => {
	const subjectId = req.params.id;
	const updatedSubject = req.body;
	try {
		const result = await subjectServices.updateSubject(
			subjectId,
			updatedSubject
		);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Subject not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update subject" });
	}
});

app.delete("/delete-subject/:id", async (req, res) => {
	const subjectId = req.params.id;
	try {
		const result = await subjectServices.deleteSubject(subjectId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Subject not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete subject" });
	}
});

// ---------------Group CRUD Endpoints----------------
app.get("/all-groups", async (req, res) => {
	try {
		const result = await groupServices.getAllGroups();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch groups" });
	}
});

app.get("/group/:id", async (req, res) => {
	try {
		const groupId = req.params.id;
		const result = await groupServices.getGroupById(groupId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Group not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch group" });
	}
});

app.post("/add-group", express.json(), async (req, res) => {
	const newGroup = req.body;
	try {
		const result = await groupServices.addGroup(newGroup);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to add group" });
	}
});

app.put("/update-group/:id", express.json(), async (req, res) => {
	const groupId = req.params.id;
	const updatedGroup = req.body;
	try {
		const result = await groupServices.updateGroup(groupId, updatedGroup);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Group not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update group" });
	}
});

app.delete("/delete-group/:id", async (req, res) => {
	const groupId = req.params.id;
	try {
		const result = await groupServices.deleteGroup(groupId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Group not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete group" });
	}
});

// ---------------Activity CRUD Endpoints----------------
app.get("/all-activities", async (req, res) => {
    try {
        const result = await activityServices.getAllActivities();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch activities" });
    }
});

app.get("/activity/:id", async (req, res) => {
    try {
        const activityId = req.params.id;
        const result = await activityServices.getActivityById(activityId);
        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ error: "Activity not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch activity" });
    }
});

app.post("/add-activity", express.json(), async (req, res) => {
    const newActivity = req.body;
    try {
        const result = await activityServices.addActivity(newActivity);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add activity" });
    }
});

app.put("/update-activity/:id", express.json(), async (req, res) => {
    const activityId = req.params.id;
    const updatedActivity = req.body;
    try {
        const result = await activityServices.updateActivity(activityId, updatedActivity);
        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ error: "Activity not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update activity" });
    }
});

app.delete("/delete-activity/:id", async (req, res) => {
    const activityId = req.params.id;
    try {
        const result = await activityServices.deleteActivity(activityId);
        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ error: "Activity not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete activity" });
    }
});

// ---------------Student Group CRUD Endpoints----------------

app.post("/add-student-group", express.json(), async (req, res) => {
	const newStudentGroup = req.body;
	try {
		const result = await studentGroupServices.addStudentGroup(newStudentGroup);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to add student group" });
	}
});

app.get("/all-student-groups", async (req, res) => {
	try {
		const result = await studentGroupServices.getAllStudentGroups();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch student groups" });
	}
});

app.delete("/delete-student-group/:student_id/:group_id", async (req, res) => {
	const studentId = req.params.student_id;
	const groupId = req.params.group_id;
	try {
		const result = await studentGroupServices.deleteStudentGroup(studentId, groupId);
		if (result) {
			return res.json(result);
		} else {
			return res.status(404).json({ error: "Student group not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete student group" });
	}
});

// ---------------Generating Reports----------------

app.get("/reports/student-groups/:teacher_id", async (req, res) => {
	try {
		const teacherId = req.params.teacher_id;
		const result = await reportServices.studentGroupsAssignedToTeacher(teacherId);
		if(result.length === 0) {
			return res.status(404).json({ error: "No student groups found for this teacher" });
		}
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate report" });
	}
});

app.get("/reports/teachers-assigned/:student_id", async (req, res) => {
	try {
		const studentId = req.params.student_id;
		const result = await reportServices.teachersAssignedToStudent(studentId);
		if(result.length === 0) {
			return res.status(404).json({ error: "No teachers found for this student" });
		}
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to generate report" });
	}
});


app.get('/reports/teacher-students', async (req, res) => {
    try {
        // Get sort parameter from query string: ?sortBy=teacher or ?sortBy=student
        const sortBy = req.query.sortBy || 'teacher';
        
        const report = await reportServices.getTeacherStudentReport(sortBy);
        
        res.json({
            sortedBy: sortBy,
            totalRecords: report.length,
            data: report
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: 'Failed to generate report',
            message: err.message 
        });
    }
});
app.listen(port, async () => {
	await connectToDB();
	console.log(`Server is running on http://localhost:${port}`);
});

app.on('close', async () => {
	await closeDB();
	console.log('Database connection closed.');
});
