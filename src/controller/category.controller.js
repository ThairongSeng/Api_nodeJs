const db = require("../config/db")
const {isEmptyOrNull} = require("../config/helper")


const create = (req, res) => {
    var body = req.body;

    var message = ""
        if(body.name == null || body.name == ""){
            message.name="Please fill in name..!"
        }
        if(message != ""){
            res.json({
                error: true,
                message: message
            })
            return false
        }
        
    var insert = "INSERT INTO `category`(`name`, `description`) VALUES (?,?)"
    db.query(insert,[body.name, body.description], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            res.json({
                message: "Category was created successfully..!",
                data: result
            })
        }
    })
}

const getAll = (req, res) => {
    var body = req.body
    var text_search = body.text_search
    var sqlSelect = "SELECT * FROM `category`";
    var sqlWhere = ""

    //search by name
    if(!isEmptyOrNull(text_search)){
        sqlWhere = " WHERE name LIKE ? "
    }
    sqlSelect += sqlWhere

    db.query(sqlSelect,['%' + text_search + '%'], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            var sqlCount = "SELECT COUNT(*) as totalRecord FROM category" + sqlWhere
            db.query(sqlCount,['%' + text_search + '%'], (err1, result1) => {
                res.json({
                    data: result,
                    totalRecord: result1[0].totalRecord
                })
            })
        }
    })
}

const getOne = (req, res) => {
    var id = req.params.id;
    var getOne = "SELECT * FROM `category` WHERE id = " + id;
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
                    message: "This categegory not found..!"
                })
            }
        }
    })
}

const update = (req, res) => {
    var body = req.body;

    var message = {}
    if(body.id == null || body.id == ""){
        message.id="Please fill in id..!"
    }
    if(body.name == null || body.name == ""){
        message.name="Please fill in name..!"
    }
    if(body.description == null || body.description == ""){
        message.description="Please fill in description"
    }
    if(Object.keys(message).length >0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var update = "UPDATE `category` SET `name`=?,`description`=? WHERE id = ?"
    db.query(update, [body.name, body.description, body.id], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows != 0){
                res.json({
                    message: "This category was updated successfully.",
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
    var remove = "DELETE FROM `category` WHERE id = ?"
    db.query(remove, body.id, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows != 0){
                res.json({
                    message: "This category was removed successfully.."
                })
            }else{
                res.json({
                    message: "This category was not found.."
                })
            }
        }
    })
}

module.exports = {
    getAll, getOne, update, remove, create
}