const db = require("../config/db")
const { isEmptyOrNull } = require('../config/helper');


const create = (req, res) => {
    var body = req.body;
    var message = {}

    if(isEmptyOrNull(body.firstname)){
        message.firstname = "Please fill in firstname"
    }
    if(isEmptyOrNull(body.lastname)){
        message.lastname = "Please fill in lastname"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var insert = "INSERT INTO `teacher`(`firstname`, `lastname`, `gender`, `tel`, `email`,`salary`,`position`) VALUES (?,?,?,?,?,?,?)"
    db.query(insert, [body.firstname, body.lastname, body.gender, body.email, body.tel, body.salary, body.position], (err, result) => {
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
    var getAll = "SELECT * FROM `teacher`"
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
    var getOne = "SELECT * FROM `teacher` WHERE id = "+id
    db.query(getOne, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.length == 0){
                res.json({
                    message: "This teacher with id "+id+" was not found.."
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
        message.lastname = "Please fill in lastname"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var update = "UPDATE `teacher` SET `firstname`=?,`lastname`=?,`gender`=?,`tel`=?,`email`=?,`salary`=?,`position`=? WHERE id=?"
    db.query(update, [body.firstname, body.lastname, body.gender, body.tel, body.email, body.salary, body.position, body.id], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }
        else{
            if(result.affectedRows != 0){
                res.json({
                    message: "Update successfully.."
                })
            }else{
                res.json({
                    message: "This teacher was not found.."
                })
            }
        }
    })
}

const remove = (req, res) => {
   var body = req.body;

   var remove = "DELETE FROM `teacher` WHERE id = ?"
   db.query(remove, body.id, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows == 0){
                res.json({
                    message: "This teacher was not found.."
                })
            }else{
                res.json({
                    message: "This teacher was remove successfully.."
                })
            }
        }
   })
   
}


module.exports = {
    create, getAll, getOne, remove, update
}