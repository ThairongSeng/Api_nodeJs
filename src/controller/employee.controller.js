const db = require("../config/db")


const create = (req, res) => {
        var body = req.body;

        var message = {}
        if(body.firstname == null || body.firstname == ""){
            message.firstname="Please fill in firstname..!"
        }
        if(body.lastname == null || body.lastname == ""){
            message.lastname="Please fill in lastname..!"
        }
        if(body.gender == null || body.gender == ""){
            message.gender="Please fill in gender..!"
        }
        if(body.position == null || body.position == ""){
            message.position="Please fill in position..!"
        }
        if(body.salary == null || body.salary == ""){
            message.salary="Please fill in salary..!"
        }
        if(body.tel == null || body.tel == ""){
            message.tel="Please fill in tel..!"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error: true,
                message: message
            })
            return false
        }

        var sqlInsert = "INSERT INTO `employee`(`firstname`, `lastname`, `gender`, `tel`, `position`, `salary`) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsert,[body.firstname, body.lastname, body.gender, body.tel, body.position, body.salary], (err, row) => {
            if(err){
                res.json({
                    error: true,
                    message: err
                })
            }else(
                res.json({
                    message: "Insert Successfully",
                    data: row
                })
            )
        })
}

const getAll = (req, res) => {
    db.query("SELECT * FROM employee",(err, row) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else(
            res.json({
                data: row
            })
        )
    })
}

const getOne = (req, res) => {
    var id = req.params.id;
    var sqlSelectOne = "SELECT * FROM employee WHERE id = "+ id;
    db.query(sqlSelectOne, (err, row) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(row.length !=0){
                res.json({
                    data: row
                })
            }else{
                res.json({
                    message: "This employee not found"
                })
            }  
        }
    })
}

const update = (req, res) => {
    var body = req.body;

    var message = {}
        if(body.firstname == null || body.firstname == ""){
            message.firstname="Please fill in firstname..!"
        }
        if(body.lastname == null || body.lastname == ""){
            message.lastname="Please fill in lastname..!"
        }
        if(body.gender == null || body.gender == ""){
            message.gender="Please fill in gender..!"
        }
        if(body.position == null || body.position == ""){
            message.position="Please fill in position..!"
        }
        if(body.salary == null || body.salary == ""){
            message.salary="Please fill in salary..!"
        }
        if(body.tel == null || body.tel == ""){
            message.tel="Please fill in tel..!"
        }
        if(body.id == null || body.id == ""){
            message.id="Please fill in id..!"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error: true,
                message: message
            })
            return false
        }

    var sqlUpdate = "UPDATE `employee` SET `firstname`=?,`lastname`=?,`gender`=?,`tel`=?,`position`=?,`salary`=? WHERE id = ?";
    db.query(sqlUpdate, [body.firstname, body.lastname, body.gender, body.tel, body.position, body.salary, body.id], (err, row) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(row.affectedRows != 0){
                res.json({
                    message: "Update successfully",
                    data: row
                })
            }else{
                res.json({
                    message: "Update not found"
                })
            }
   
        }
    })
}

const remove = (req, res) => {
    var body = req.body;
    var sqlDelete = "DELETE FROM employee WHERE id = ?"
    db.query(sqlDelete, body.id, (err, row) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(row.affectedRows != 0){
                res.json({
                message: "Delete Successfully",
                })
            }else{
                res.json({
                    message: "Delete not found"
                })
            } 
        }
    })
}


module.exports = {
    create, getAll, getOne, remove, update
}