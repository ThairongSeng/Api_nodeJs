const db = require("../config/db")
const {isEmptyOrNull} = require("../config/helper")

const create = (req, res) => {
    var body = req.body;

    var message = {}
        if(isEmptyOrNull(body.teacher_id)){
            message.teacher_id="Please fill in teacher id..!"
        }
        if(isEmptyOrNull(body.course_id)){
            message.course_id="Please fill in course id..!"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error: true,
                message: message
            })
            return false
        }
        
    var insert = "INSERT INTO `classroom`(`teacher_id`, `course_id`, `start_time`, `end_time`) VALUES (?,?,?,?)"
    db.query(insert,[body.teacher_id, body.course_id, body.start_time, body.end_time], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            res.json({
                message: "Classroom was created successfully..!",
                data: result
            })
        }
    })
}

const getAll = (req, res) => {
    var getAll = "SELECT * FROM `classroom`";
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
    var getOne = "SELECT * FROM `classroom` WHERE id = " + id;
    db.query(getOne, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.length != 0){
                res.json({
                    data: result
                })
            }else{
                res.json({
                    message: "This classroom id = "+id +" not found..!"
                })
            }
        }
    })
}

const update = (req, res) => {
    var body = req.body;

    var message = {}
    if(isEmptyOrNull(body.id)){
        message.id="Please fill in id..!"
    }
    if(isEmptyOrNull(body.teacher_id)){
        message.teacher_id="Please fill in teacher id..!"
    }
    if(isEmptyOrNull(body.course_id)){
        message.course_id="Please fill in course id..!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var update = "UPDATE `classroom` SET `teacher_id`=?,`course_id`=?,`start_time`=?,`end_time`=? WHERE id=?"
    db.query(update, [body.teacher_id, body.course_id,body.start_time, body.end_time, body.id], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows != 0){
                res.json({
                    message: "This classroom was updated successfully.",
                    data: result
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
    var remove = "DELETE FROM `classroom` WHERE id = ?"
    db.query(remove, body.id, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows != 0){
                res.json({
                    message: "This classroom was removed successfully.."
                })
            }else{
                res.json({
                    message: "This classroom was not found.."
                })
            }
        }
    })
}

module.exports = {
    getAll, getOne, update, remove, create
}