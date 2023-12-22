
const studentClassroomCon = require("../controller/studentclassroom.controller")

const studentClassroom = (app) => {
    app.post("/api/v1/studentClassroom", studentClassroomCon.create)
    app.get("/api/v1/studentClassroom", studentClassroomCon.getAll)
    app.get("/api/v1/studentClassroom/:id", studentClassroomCon.getOne)
    app.put("/api/v1/studentClassroom", studentClassroomCon.update)
    app.delete("/api/v1/studentClassroom", studentClassroomCon.remove)


}

module.exports = studentClassroom