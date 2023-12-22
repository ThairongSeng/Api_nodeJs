const db = require("../config/db")
const {isEmptyOrNull} = require("../config/helper")


const create = (req, res) => {
    var body = req.body;
    var message = {}

    if(isEmptyOrNull(body.firstname)){
        message.firstname = "Please fill in firstname"
    }
    if(isEmptyOrNull(body.lastname)){
        message.lastname = "Please fill in course name"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var insert = "INSERT INTO `student`(`firstname`, `lastname`, `gender`, `tel`, `email`) VALUES (?,?,?,?,?)"
    db.query(insert, [body.firstname, body.lastname, body.gender, body.email, body.tel], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            res.json({
                message: "Insert successfully..",
                data: result
            })
        }
    })
}

const getAll = (req, res) => {
    var getAll = "SELECT * FROM `student`"
    db.query(getAll, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            res.json({
                data: result
            })
        }
    })
}

const getOne = (req, res) => {
    var id = req.params.id;
    var getOne = "SELECT * FROM `student` WHERE id = "+id
    db.query(getOne, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.length == 0){
                res.json({
                    message: "This student with id "+id+" was not found.."
                })
            }else{
                res.json({
                    data: result
                })
            }
        }
    })
}

const update = (req, res) => {
    var body = req.body;
    var message = {}

    if(isEmptyOrNull(body.id)){
        message.id = "Please fill in id"
    }
    if(isEmptyOrNull(body.firstname)){
        message.firstname = "Please fill in firstname"
    }
    if(isEmptyOrNull(body.lastname)){
        message.lastname = "Please fill in course name"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var update = "UPDATE `student` SET `firstname`=?,`lastname`=?,`gender`=?,`tel`=?,`email`=? WHERE id=?"
    db.query(update, [body.firstname, body.lastname, body.gender, body.tel, body.email, body.id], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows != 0){
                res.json({
                    message: "Update successfully..",
                    data: result
                })
            }else{
                res.json({
                    message: "This student was not found.."
                })
            }
        }
    })
}

const remove = (req, res) => {
   var body = req.body;

   var remove = "DELETE FROM `student` WHERE id = ?"
   db.query(remove, body.id, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows == 0){
                res.json({
                    message: "This student with id "+id+" was not found.."
                })
            }else{
                res.json({
                    message: "Delete successfully.."
                })
            }
        }
   })
   
}


module.exports = {
    create, getAll, getOne, remove, update
}