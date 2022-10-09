var express = require("express");
var router = express.Router();
const monk = require("monk");
const url = "mongodb+srv://admin:zz12345@cluster0.wv76mfw.mongodb.net/XML?retryWrites=true&w=majority"
const db = monk(url);
let Dorm = db.get('projectxmls')

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/image') // ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".png")//เปลี่ยนชื่อไฟล์ ป้องกันชื่อซ้ำกัน
    }
})

//เริ่มต้น upload
const upload = multer({
    storage:storage
})

router.get("/",async (req,res)=>{
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = 10;
    const count = await Dorm.count({})
    const total = Math.round(count/10)
    await Dorm.find({},{limit : 10,skip:page*limit,sort:{_id:-1}}, (err,docs)=>{
      if(err) throw err;
      res.render("admin",{data:docs,page:page,total:total})
   
    })
});
router.get("/insert",async (req,res)=>{
    res.render("InsertEditDelete")
});



router.post("/add_data",upload.array("image",4), function (req, res, next){

  let arrFile = []
  for(i in req.files){
    arrFile.push(req.files[i].filename)
    
  }

  var air = req.body.air;
  var elevator = req.body.elevator;
  var wifi = req.body.wifi;
  var tv = req.body.tv;
  var water_heater = req.body.water_heater;
  var keycard = req.body.keycard;
  var fan = req.body.fan;
  var wardrobe = req.body.wardrobe;
  var single_bed = req.body.single_bed;
  var double_bed = req.body.double_bed;

  var parking = req.body.parking;
  var gym = req.body.gym;
  var cctv = req.body.cctv;
  var public_wifi = req.body.public_wifi;
  var laundry = req.body.laundry;

  var smoking = req.body.smoking;
  var pet = req.body.pet;

  if(air){
    var has_air = "has"
  }else{
    var has_air = "not"
  }

  if(elevator){
    var has_elevator = "has"
  }else{
    var has_elevator = "not"
  }

  if(wifi){
    var has_wifi = "has"
  }else{
    var has_wifi = "not"
  }

  if(tv){
    var has_tv = "has"
  }else{
    var has_tv = "not"
  }

  if(water_heater){
    var has_water_heater = "has"
  }else{
    var has_water_heater = "not"
  }
  
  if(keycard){
    var has_keycard = "has"
  }else{
    var has_keycard = "not"
  }
  
  if(fan){
    var has_fan = "has"
  }else{
    var has_fan = "not"
  }
  
  if(wardrobe){
    var has_wardrobe = "has"
  }else{
    var has_wardrobe = "not"
  }
  
  if(single_bed){
    var has_single_bed = "has"
  }else{
    var has_single_bed = "not"
  }
  
  if(double_bed){
    var has_double_bed = "has"
  }else{
    var has_double_bed = "not"
  }

  
  if(parking){
    var has_parking = "has"
  }else{
    var has_parking = "not"
  }
  
  if(gym){
    var has_gym = "has"
  }else{
    var has_gym = "not"
  }
  
  if(cctv){
    var has_cctv = "has"
  }else{
    var has_cctv = "not"
  }
  
  if(public_wifi){
    var has_public_wifi = "has"
  }else{
    var has_public_wifi = "not"
  }
  
  if(laundry){
    var has_laundry = "has"
  }else{
    var has_laundry = "not"
  }

  
  if(smoking){
    var has_smoking = "not"
  }else{
    var has_smoking = "has"
  }
  
  if(pet){
    var has_pet = "not"
  }else{
    var has_pet = "has"
  }

  Dorm.insert({
    
    name:req.body.name,

    address:{number:req.body.address_number,
      novillage:req.body.address_novillage,
      namevillage:req.body.address_namevillage,
      subdistrict:req.body.address_subdistrict,
      district:req.body.address_district,
      province:req.body.address_province,
      zipcode:req.body.address_zipcode},

    contacts:{
      phones:[req.body.contacts_phone1,req.body.contacts_phone2],
      email:req.body.contacts_email,
      facebook:req.body.contacts_facebook,
      line:req.body.contacts_line},

    facilities:{
      private:[
        {name:"แอร์",hasornot:has_air},
        {name:"ลิฟต์",hasornot:has_elevator},
        {name:"wifi",hasornot:has_wifi},
        {name:"มี TV",hasornot:has_tv},
        {name:"เครื่องทำน้ำอุ่น",hasornot:has_water_heater},
        {name:"คีย์การ์ด",hasornot:has_keycard},
        {name:"พัดลม",hasornot:has_fan},
        {name:"ตู้เสื้อผ้า",hasornot:has_wardrobe},
        {name:"เตียงเดี่ยว",hasornot:has_single_bed},
        {name:"เตียงคู่",hasornot:has_double_bed},
      ],
      public:[
        {name:"ที่จอดรถ",hasornot:has_parking},
        {name:"โรงยิม/ฟิตเนส",hasornot:has_gym},
        {name:"กล้องวงจรปิด",hasornot:has_cctv},
        {name:"wifi ส่วนกลาง",hasornot:has_public_wifi},
        {name:"ร้านซัก-รีด",hasornot:has_laundry},
      ]
    },

    rules:[
      {name:"เลี้ยงสัตว์",hasornot:has_pet},
      {name:"สูบบุหรี่",hasornot:has_smoking}
    ],

    zone:req.body.zone,

    detail:req.body.dorm_detail,

    map:req.body.googlemap,

    prices:{
      monthly:req.body.monthly,
      daily:req.body.daily,
      waterFee:req.body.waterFee,
      electricFee:req.body.electricFee,
      centralFee:req.body.centralFee,
      insurance:req.body.insurance,
    },
    
    contracts:{
      contract:[
        req.body.one_year,
        req.body.six_month,
        req.body.three_month
      ]
    },
    nearbyPlaces:{
      Place:[
        {name:req.body.nearby_edu_name1,distance:req.body.nearby_edu_distance1,type:"study"},
        {name:req.body.nearby_edu_name2,distance:req.body.nearby_edu_distance2,type:"study"},
        {name:req.body.nearby_edu_name3,distance:req.body.nearby_edu_distance3,type:"study"},
        {name:req.body.nearby_road_name1,distance:req.body.nearby_road_distance1,type:"road"},
        {name:req.body.nearby_road_name2,distance:req.body.nearby_road_distance2,type:"road"},
        {name:req.body.nearby_road_name3,distance:req.body.nearby_road_distance3,type:"road"},
        {name:req.body.nearby_store_name1,distance:req.body.nearby_store_distance1,type:"store"},
        {name:req.body.nearby_store_name2,distance:req.body.nearby_store_distance2,type:"store"},
        {name:req.body.nearby_store_name3,distance:req.body.nearby_store_distance3,type:"store"}
        
      ]
    },

    images:{img:arrFile}
    

},function(err,blog){
    if(err){
      res.send(err);
    }else{
      res.location('/admin');
      res.redirect('/admin');
    }
})

});

router.post("/update",(req, res)=>{
  const update_id = req.body.update_id

  var air = req.body.air;
  var elevator = req.body.elevator;
  var wifi = req.body.wifi;
  var tv = req.body.tv;
  var water_heater = req.body.water_heater;
  var keycard = req.body.keycard;
  var fan = req.body.fan;
  var wardrobe = req.body.wardrobe;
  var single_bed = req.body.single_bed;
  var double_bed = req.body.double_bed;

  var parking = req.body.parking;
  var gym = req.body.gym;
  var cctv = req.body.cctv;
  var public_wifi = req.body.public_wifi;
  var laundry = req.body.laundry;

  var smoking = req.body.smoking;
  var pet = req.body.pet;

  if(air){
    var has_air = "has"
  }else{
    var has_air = "not"
  }

  if(elevator){
    var has_elevator = "has"
  }else{
    var has_elevator = "not"
  }

  if(wifi){
    var has_wifi = "has"
  }else{
    var has_wifi = "not"
  }

  if(tv){
    var has_tv = "has"
  }else{
    var has_tv = "not"
  }

  if(water_heater){
    var has_water_heater = "has"
  }else{
    var has_water_heater = "not"
  }
  
  if(keycard){
    var has_keycard = "has"
  }else{
    var has_keycard = "not"
  }
  
  if(fan){
    var has_fan = "has"
  }else{
    var has_fan = "not"
  }
  
  if(wardrobe){
    var has_wardrobe = "has"
  }else{
    var has_wardrobe = "not"
  }
  
  if(single_bed){
    var has_single_bed = "has"
  }else{
    var has_single_bed = "not"
  }
  
  if(double_bed){
    var has_double_bed = "has"
  }else{
    var has_double_bed = "not"
  }

  
  if(parking){
    var has_parking = "has"
  }else{
    var has_parking = "not"
  }
  
  if(gym){
    var has_gym = "has"
  }else{
    var has_gym = "not"
  }
  
  if(cctv){
    var has_cctv = "has"
  }else{
    var has_cctv = "not"
  }
  
  if(public_wifi){
    var has_public_wifi = "has"
  }else{
    var has_public_wifi = "not"
  }
  
  if(laundry){
    var has_laundry = "has"
  }else{
    var has_laundry = "not"
  }

  
  if(smoking){
    var has_smoking = "not"
  }else{
    var has_smoking = "has"
  }
  
  if(pet){
    var has_pet = "not"
  }else{
    var has_pet = "has"
  }

  Dorm.findOneAndUpdate({
    update_id},{
    name:req.body.name,

    address:{number:req.body.address_number,
      novillage:req.body.address_novillage,
      namevillage:req.body.address_namevillage,
      subdistrict:req.body.address_subdistrict,
      district:req.body.address_district,
      province:req.body.address_province,
      zipcode:req.body.address_zipcode},

    contacts:{
      phones:[req.body.contacts_phone1,req.body.contacts_phone2],
      email:req.body.contacts_email,
      facebook:req.body.contacts_facebook,
      line:req.body.contacts_line},

    facilities:{
      private:[
        {name:"แอร์",hasornot:has_air},
        {name:"ลิฟต์",hasornot:has_elevator},
        {name:"wifi",hasornot:has_wifi},
        {name:"มี TV",hasornot:has_tv},
        {name:"เครื่องทำน้ำอุ่น",hasornot:has_water_heater},
        {name:"คีย์การ์ด",hasornot:has_keycard},
        {name:"พัดลม",hasornot:has_fan},
        {name:"ตู้เสื้อผ้า",hasornot:has_wardrobe},
        {name:"เตียงเดี่ยว",hasornot:has_single_bed},
        {name:"เตียงคู่",hasornot:has_double_bed},
      ],
      public:[
        {name:"ที่จอดรถ",hasornot:has_parking},
        {name:"โรงยิม/ฟิตเนส",hasornot:has_gym},
        {name:"กล้องวงจรปิด",hasornot:has_cctv},
        {name:"wifi ส่วนกลาง",hasornot:has_public_wifi},
        {name:"ร้านซัก-รีด",hasornot:has_laundry},
      ]
    },

    rules:[
      {name:"เลี้ยงสัตว์",hasornot:has_pet},
      {name:"สูบบุหรี่",hasornot:has_smoking}
    ],

    zone:req.body.zone,

    detail:req.body.dorm_detail,

    map:req.body.googlemap,

    prices:{
      monthly:req.body.monthly,
      daily:req.body.daily,
      waterFee:req.body.waterFee,
      electricFee:req.body.electricFee,
      centralFee:req.body.centralFee,
      insurance:req.body.insurance,
    },
    
    contracts:{
      contract:[
        req.body.one_year,
        req.body.six_month,
        req.body.three_month
      ]
    },
    nearbyPlaces:{
      Place:[
        {name:req.body.nearby_edu_name1,distance:req.body.nearby_edu_distance1,type:"study"},
        {name:req.body.nearby_edu_name2,distance:req.body.nearby_edu_distance2,type:"study"},
        {name:req.body.nearby_edu_name3,distance:req.body.nearby_edu_distance3,type:"study"},
        {name:req.body.nearby_road_name1,distance:req.body.nearby_road_distance1,type:"road"},
        {name:req.body.nearby_road_name2,distance:req.body.nearby_road_distance2,type:"road"},
        {name:req.body.nearby_road_name3,distance:req.body.nearby_road_distance3,type:"road"},
        {name:req.body.nearby_store_name1,distance:req.body.nearby_store_distance1,type:"store"},
        {name:req.body.nearby_store_name2,distance:req.body.nearby_store_distance2,type:"store"},
        {name:req.body.nearby_store_name3,distance:req.body.nearby_store_distance3,type:"store"}
        
      ]
    }
    

},function(err,blog){
    if(err){
      res.send(err);
    }else{
      res.location('/admin');
      res.redirect('/admin');
    }
})

});

router.post("/edit",(req,res)=>{
  const edit_id = req.body.edit_id
  console.log(edit_id);
  Dorm.findOne({_id:edit_id},(err,doc)=>{
    console.log(doc)
    res.render("edit",{data:doc})
  })
})


router.get("/delete/:id",(req,res)=>{
  Dorm.findOneAndDelete(req.params.id,{useFindAndModify:false},(err=>{
    if(err) console.log(err)
    res.redirect("/admin")
  }))
})

router.get
module.exports = router;