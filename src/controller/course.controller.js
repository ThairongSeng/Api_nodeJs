const db = require("../config/db")


const create = (req, res) => {
    var body = req.body;
    var message = {}

    if(body.category_id == null || body.category_id == ""){
        message.category_id = "Please fill in category_id"
    }
    if(body.name == null || body.name == ""){
        message.name = "Please fill in course name"
    }
    if(body.price == null || body.price == ""){
        message.price = "Please fill in price"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var insert = "INSERT INTO `course`(`category_id`,`name`, `description`, `price`) VALUES (?,?,?,?)"
    db.query(insert, [body.category_id, body.name, body.description, body.price], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            res.json({
                message: "Insert successfully..!",
                data: result
            })
        }
    })
}
// SELECT c.*, ca.name as category_name FROM course as c INNER JOIN category as ca on (c.category_id = ca.id) //1
// SELECT c.*, ca.name as category_name FROM course as c, category as ca WHERE c.category_id = ca.id //2
const getAll = (req, res) => {
  var getAll = "SELECT" +
                " c.id,"+
                " c.name as course_name,"+
                " c.price,"+
                " ca.name as category_name,"+
                " DATE_FORMAT(c.create_at, '%d/%m/%Y') as create_at"+
                " FROM course as c"+
                " INNER JOIN category as ca on (c.category_id = ca.id);";

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
   var getOne = "SELECT * FROM course WHERE id ="+id
   db.query(getOne, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.length ==0){
                res.json({
                    data: [],
                    message: "This course was not found.."
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

   if(body.id == null || body.id == ""){
    message.id = "Please fill in id"
    }
   if(body.category_id == null || body.category_id == ""){
       message.category_id = "Please fill in category_id"
   }
   if(body.name == null || body.name == ""){
       message.name = "Please fill in course name"
   }
   if(body.price == null || body.price == ""){
       message.price = "Please fill in price"
   }
   if(Object.keys(message).length > 0){
       res.json({
           error: true,
           message: message
       })
       return false
   }

   var update = "UPDATE `course` SET `category_id`=?, `name`=?,`description`=?,`price`=? WHERE id = ?"

   db.query(update,[body.category_id, body.name, body.description, body.price, body.id], (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
           if(result.affectedRows == 0){
                res.json({
                    message: "this course was not found.."
                })
           }else{
                res.json({
                    message: "udpate successfully..",
                    data: result
                })
           }
        }
   })
}

const remove = (req, res) => {
    var body = req.body;
    var remove = "DELETE FROM `course` WHERE id = ?"
    db.query(remove,body.id, (err, result) => {
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.affectedRows ==0){
                res.json({
                    message: "This course was not found.."
                })
            }else{
                res.json({
                    message: "Delete successfully..."
                })
            }
        }
    })
   
}

module.exports = {
    getAll, getOne, update, remove, create
}