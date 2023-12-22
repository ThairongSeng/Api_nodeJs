
const studentCon = require("../controller/student.controller")

const student = (app) => {
    app.post("/api/v1/student", studentCon.create)
    app.get("/api/v1/student", studentCon.getAll)
    app.get("/api/v1/student/:id", studentCon.getOne)
    app.put("/api/v1/student", studentCon.update)
    app.delete("/api/v1/student", studentCon.remove)


}

module.exports = student