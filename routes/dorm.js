var express = require("express");
var router = express.Router();
const DormSchema = require("../models/dormmodels");
const monk = require("monk");
const url = "mongodb+srv://admin:zz12345@cluster0.wv76mfw.mongodb.net/XML?retryWrites=true&w=majority"
const db = monk(url);
let Dorm = db.get('projectxmls')


router.get("/all", (req, res, next) => {
  Dorm.find({},(err,docs)=>{
    if(err) throw err;
    res.render("dorm.ejs",{data:docs})
 
  })
});
// แบ่งเวลาค้นหาโซนโซนกัน
router.get("/zone/:id", (req, res, next) => {
  const _id = req.params.id
  Dorm.find({ zone: _id},(err,docs)=>{
    res.send(docs)
  })
});
// ค้นหาเวลากดจาก id
router.get("/search/:id", (req, res, next) => {
  const paramid = req.params.id;
  let data;
  Dorm.findOne({_id:paramid},(err,docs)=>{
    if(err) throw err;
    data = docs
    Dorm.find({},(err,docs)=>{
      console.log(data)
      if(err) throw err;
      res.render("information",{data:data ,recommend:docs})
   
    })
  })

});

// insert พวกข้อความเอา ข้อมูลจากฟอร์มมาใส่เอาแทน
router.post("/add", (req, res) => {
  const check = req.body;
  if (!check) {
    return res.send("ไม่เจอข้อมูล");
  }


});

// put = update

// delete
module.exports = router;
