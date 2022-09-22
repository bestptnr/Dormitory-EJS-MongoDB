var express = require("express");
var router = express.Router();

const monk = require("monk");
const url = "mongodb+srv://admin:zz12345@cluster0.wv76mfw.mongodb.net/XML?retryWrites=true&w=majority"
const db = monk(url);
let Dorm = db.get('projectxmls')


router.get("/",async (req,res)=>{
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = 10;
    const count = await Dorm.count({})
    const total = Math.round(count/10)
    await Dorm.find({},{limit : 10,skip:page*limit,sort:{_id:-1}}, (err,docs)=>{
      if(err) throw err;
      res.render("admin",{data:docs,page:page,total:total})
   
    })
})
router.get("/insert",async (req,res)=>{
    res.render("InsertEditDelete")
})
module.exports = router;