const express = require("express");
const app = express();
const cors = require("cors")


//config input json
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:"*"})) //allow client request api


require("./src/route/student.route")(app)
require("./src/route/teacher.route")(app)
require("./src/route/employee.route")(app)
require("./src/route/category.route")(app)
require("./src/route/course.route")(app)
require("./src/route/classroom.route")(app)
require("./src/route/studentclassroom.route")(app)


//config route 
const port = 8080;
app.listen(port, () => {
    console.log("http://localhost:8080")
})