
const teacherCon = require("../controller/teacher.controller")

const teacher = (app) => {
    app.post("/api/v1/teacher", teacherCon.create)
    app.get("/api/v1/teacher", teacherCon.getAll)
    app.get("/api/v1/teacher/:id", teacherCon.getOne)
    app.put("/api/v1/teacher", teacherCon.update)
    app.delete("/api/v1/teacher", teacherCon.remove)
}

module.exports = teacher