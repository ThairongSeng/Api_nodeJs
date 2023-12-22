const courseCon = require("../controller/course.controller")


const course = (app) => {
    app.post("/api/v1/course", courseCon.create);
    app.get("/api/v1/course", courseCon.getAll);
    app.get("/api/v1/course/:id", courseCon.getOne);
    app.put("/api/v1/course", courseCon.update);
    app.delete("/api/v1/course", courseCon.remove)
}

module.exports = course