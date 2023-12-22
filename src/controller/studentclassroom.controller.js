const db = require("../config/db")
const {isEmptyOrNull} = require("../config/helper")


const create = (req, res) => {
    var body = req.body;
    var message = {}

    if(isEmptyOrNull(body.classroom_id)){
        message.classroom_id = "Please fill in classroom_id"
    }
    if(isEmptyOrNull(body.student_id)){
        message.student_id = "Please fill in student_id"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var insert = "INSERT INTO `student_classroom`(`classroom_id`, `student_id`, `discount`, `discount_type`, `payment_price`, `payment_method`, `payment_date`) VALUES (?,?,?,?,?,?,?)"
    db.query(insert, [body.classroom_id, body.student_id, body.discount, body.discount_type, body.payment_price, body.payment_method, body.payment_date], (err, result) => {
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
    var getAll = "SELECT * FROM `student_classroom`"
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
    var getOne = "SELECT * FROM `student_classroom` WHERE id = "+id
    db.query(getOne, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.length == 0){
                res.json({
                    message: "This student classroom with id "+id+" was not found.."
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
    if(isEmptyOrNull(body.classroom_id)){
        message.classroom_id = "Please fill in classroom_id"
    }
    if(isEmptyOrNull(body.student_id)){
        message.student_id = "Please fill in student_id"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var update = "UPDATE `student_classroom` SET `classroom_id`=?,`student_id`=?,`discount`=?,`discount_type`=?,`payment_price`=?',`payment_method`=?,`payment_date`=? WHERE id =?"
    db.query(update, [body.classroom_id, body.student_id, body.discount, body.discount_type, body.payment_price,body.payment_method, body.payment_date, body.id], (err, result) => {
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

   var remove = "DELETE FROM `student_classroom` WHERE id = ?"
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