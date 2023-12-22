const classroomCon = require("../controller/classroom.controller")


const classroom = (app) => {
    app.post("/api/v1/classroom", classroomCon.create);
    app.get("/api/v1/classroom", classroomCon.getAll);
    app.get("/api/v1/classroom/:id", classroomCon.getOne);
    app.put("/api/v1/classroom", classroomCon.update);
    app.delete("/api/v1/classroom", classroomCon.remove)
}

module.exports = classroom