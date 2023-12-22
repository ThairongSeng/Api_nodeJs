const categoryCon = require("../controller/category.controller")


const category = (app) => {
    app.post("/api/v1/category", categoryCon.create);
    app.get("/api/v1/category", categoryCon.getAll);
    app.get("/api/v1/category/:id", categoryCon.getOne);
    app.put("/api/v1/category", categoryCon.update);
    app.delete("/api/v1/category", categoryCon.remove)
}

module.exports = category
