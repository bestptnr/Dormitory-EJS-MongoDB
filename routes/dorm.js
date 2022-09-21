var express = require("express");
var router = express.Router();
const DormSchema = require("../models/dormmodels");
const monk = require("monk");
const url = "mongodb+srv://admin:zz12345@cluster0.wv76mfw.mongodb.net/XML?retryWrites=true&w=majority"
const db = monk(url);
let Dorm = db.get('projectxmls')


router.get("/all", (req, res, next) => {
  Dorm.find({},{sort:{_id:-1}},(err,docs)=>{
    if(err) throw err;
    res.render("dorm.ejs",{data:docs,title:"all"})
 
  })
});
// แบ่งเวลาค้นหาโซนโซนกัน
router.get("/zone/:id", (req, res, next) => {
  const _id = req.params.id
  let data;

  Dorm.find({zone:_id},{sort:{_id:-1}},(err,docs)=>{
    if(err) throw err;
    data = docs
    Dorm.find({},(err,docs)=>{
      if(err) throw err;
      res.render("search",{data:data ,recommend:docs,title:_id})
   
    })
  })
});
// ค้นหาเวลากดจาก id
router.get("/find/:id", (req, res, next) => {
  const paramid = req.params.id;
  let data;
  Dorm.findOne({_id:paramid},(err,docs)=>{
    if(err) throw err;
    data = docs
    Dorm.find({},(err,docs)=>{
      console.log(data)
      if(err) throw err;
      res.render("information",{data:data ,recommend:docs,title:data.zone})
   
    })
  })

});
router.get("/search",async (req,res)=>{
  var id = req.query.search
  var query = {
    name: {
      $regex: id,
      $options: 'i'
    }
  };
  await Dorm.find({},{sort:{_id:-1}},(err,docs)=>{
    if(err) throw err;
    data = docs
    Dorm.find(query,{sort:{_id:-1}},(err,docs)=>{
      if(err) throw err;
       res.render("search",{data:docs ,recommend:data,title:"search"})
   
    })
  })
 
})
// insert พวกข้อความเอา ข้อมูลจากฟอร์มมาใส่เอาแทน
router.post("/add", (req, res) => {
  const check = req.body;
  if (!check) {
    return res.send("ไม่เจอข้อมูล");
  }


});

router.get("/main",async (req,res)=>{
  let data=[];
  await Dorm.find({zone:"กังสดาล"}, { limit : 4,sort:{_id:-1} },async (err,docs)=>{
    if(err) throw err;
    data = [...docs]
    await Dorm.find({zone:"หลังมอ"}, { limit : 4,sort:{_id:-1} },async (err,docs)=>{
      if(err) throw err;
      data = [...data,...docs]
      await Dorm.find({zone:"เมือง"}, { limit : 4,sort:{_id:-1} },async (err,docs)=>{
        if(err) throw err;
        data = [...data,...docs]
        await Dorm.find({zone:"โนนม่วง"}, { limit : 4,sort:{_id:-1} },async (err,docs)=>{
          if(err) throw err;
          data = [...data,...docs]
          await Dorm.find({zone:"โคลัมโบ"}, { limit : 4,sort:{_id:-1} },async (err,docs)=>{
            if(err) throw err;
            data = [...data,...docs]
            res.render("homepage",{data:data,title:"main"})
           })
          })
        })
      })
    })
})
// put = update

// delete
module.exports = router;
