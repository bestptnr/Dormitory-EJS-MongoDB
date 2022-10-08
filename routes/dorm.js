var express = require("express");
var router = express.Router();
const DormSchema = require("../models/dormmodels");
const monk = require("monk");
const url = "mongodb+srv://admin:zz12345@cluster0.wv76mfw.mongodb.net/XML?retryWrites=true&w=majority"
const db = monk(url);
let Dorm = db.get('projectxmls')


router.get("/all", async (req, res, next) => {
  let sort = "1"
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = 4;
  const count = await Dorm.count({})
  const total = Math.round(count/4)

  if(req.query.sort=='asc'){
    let sort = req.query.sort
    await Dorm.find({},{limit : 4,skip:page*limit,sort:{prices:1}}, (err,docs)=>{
      if(err) throw err;
      res.render("dorm.ejs",{data:docs,title:"all",page:page,total:total,sort:sort})
   
    })
  }
  if(req.query.sort=='desc'){
    let sort = req.query.sort
    await Dorm.find({},{limit : 4,skip:page*limit,sort:{prices:-1}}, (err,docs)=>{
      if(err) throw err;
      res.render("dorm.ejs",{data:docs,title:"all",page:page,total:total,sort:sort})
   
    })
  }else{
    await Dorm.find({},{limit : 4,skip:page*limit,sort:{_id:-1}}, (err,docs)=>{
      if(err) throw err;
      res.render("dorm.ejs",{data:docs,title:"all",page:page,total:total,sort:sort})
   
    })
  }

});
// แบ่งเวลาค้นหาโซนโซนกัน
router.get("/zone/:id", async (req, res, next) => {
  const _id = req.params.id
  let data;
  let sort = "1"
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = 4;
  const count = await Dorm.count({zone:_id})
  const total = Math.round(count/4)
  
  if(req.query.sort == "asc"){
    let sort = req.query.sort
    const zone = await Dorm.find({zone:_id,},{limit : 4,skip:page*limit,sort:{prices:1}},(err,docs)=>{
      data = docs
      Dorm.find({},{limit : 4,sort:{_id:-1}},(err,docs)=>{
        if(err) throw err;
        // res.send(docs)
        res.render("search",{data:data ,recommend:docs,title:_id,page:page,total:total,sort:sort})
     
      })
    })
  }else if(req.query.sort == "desc"){
    let sort = req.query.sort
    const zone = await Dorm.find({zone:_id,},{limit : 4,skip:page*limit,sort:{prices:-1}},(err,docs)=>{
      data = docs
      Dorm.find({},{limit : 4,sort:{_id:-1}},(err,docs)=>{
        if(err) throw err;
        // res.send(docs)
        res.render("search",{data:data ,recommend:docs,title:_id,page:page,total:total,sort:sort})
     
      })
    })
  }
  else{
    const zone = await Dorm.find({zone:_id,},{limit : 4,skip:page*limit},(err,docs)=>{
      data = docs
      Dorm.find({},{limit : 4,sort:{_id:-1}},(err,docs)=>{
        if(err) throw err;
        console.log(page)
        // res.send(docs)
        res.render("search",{data:data ,recommend:docs,title:_id,page:page,total:total,sort:sort})
     
      })
    })
  }


});


// ค้นหาเวลากดจาก id
router.get("/find/:id", (req, res, next) => {
  const paramid = req.params.id;
  let data;
  Dorm.findOne({_id:paramid},(err,docs)=>{
    if(err) throw err;
    data = docs
    Dorm.find({},{limit : 4},(err,docs)=>{
      console.log(data)
      if(err) throw err;
      res.render("information",{data:data ,recommend:docs,title:data.zone})
   
    })
  })

});
router.get("/search", async (req,res)=>{
  var id = req.query.search
  let sort = "1"
  var query = {
    name: {
      $regex: id,
      $options: 'i'
    }
  };
  const limit = 4;
  const page = parseInt(req.query.page) - 1 || 0;
  const count = await Dorm.count(query,{sort:{_id:1}})
  console.log(count)
  const total = Math.round(count/4)
 
  await Dorm.find({},{limit : 4,sort:{_id:1}},(err,docs)=>{
    if(err) throw err;
    data = docs
    Dorm.find(query,{limit : 4,skip:page*limit,sort:{_id:-1}},async (err,docs)=>{
      if(err) throw err;      
       res.render("search",{data:docs ,recommend:data,title:"search",search:id ,page:page,total:total,sort:sort})
   
    })
  })
 
})

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

module.exports = router;
