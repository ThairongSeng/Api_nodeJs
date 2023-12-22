
const employeeCon = require("../controller/employee.controller")

const employee = (app) => {
    app.post("/api/v1/employee", employeeCon.create)
    app.get("/api/v1/employee", employeeCon.getAll)
    app.get("/api/v1/employee/:id", employeeCon.getOne)
    app.put("/api/v1/employee", employeeCon.update)
    app.delete("/api/v1/employee", employeeCon.remove)


}

module.exports = employee