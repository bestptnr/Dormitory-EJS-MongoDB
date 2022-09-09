var express = require("express");
var router = express.Router();
const DormSchema = require("../models/dormmodels");

router.get("/search", (req, res, next) => {
  DormSchema.find().then((data) => {
    res.send(data);
  });
});
// แบ่งเวลาค้นหาโซนโซนกัน
router.get("/zone", (req, res, next) => {
  DormSchema.find({ zone: "เมือง" }).then((data) => {
    res.send(data);
  });
});
// ค้นหาเวลากดจาก id
router.get("/search/:id", (req, res, next) => {
  const paramid = req.params.id;
  DormSchema.findById(paramid)
    .then((reslut) => {
      res.send(reslut);
    })
    .catch((e) => console.log(e));
});

// insert พวกข้อความเอา ข้อมูลจากฟอร์มมาใส่เอาแทน
router.post("/add", (req, res) => {
  const check = req.body;
  if (!check) {
    return res.send("ไม่เจอข้อมูล");
  }

  const NewDorm = new DormSchema({
    name: "ณัฐพงศ์แมนชั่น",
    address: {
      number: "2/5",
      novillage: "ม.12",
      namevillage: "ถ.ราษฎร์คะนึง",
      subdistrict: "ต.ในเมือง",
      district: "อ.เมืองขอนแก่น",
      province: "ขอนแก่น",
      zipcode: "40000",
    },
    contacts: {
      phones: {
        phone: ["043-236236", "089-8616928"],
      },
      email: "-",
      facebook: "-",
      line: "-",
    },
    facilities: {
      private: {
        lift: false,
        air: false,
        wifi: false,
        tv: false,
        waterheater: false,
        keycard: false,
        balcony: true,
        fan: false,
        clothing: false,
        signleBe: false,
        twinBed: false,
      },
      public: {
        carpark: true,
        gym: false,
        wifi: false,
        cctv: true,
        washMachine: false,
      },
    },
    rules: {
      pet: false,
      smoking: false,
    },
    prices: {
      monthly: "1,5000 - 2,000",
      daily: 300,
      waterBill: "15",
      electricBill: "4.5",
      centralBill: "โทรสอบถาม",
      insurance: "โทรสอบถาม",
    },
    contracts: {
      contract: ["6 เดือน", "9 เดือน", "1 ปี"],
    },
    nearbyPlaces: {
      roads: {
        road: [" ถนนอดุลยาราม 2.2 กม."],
      },
      studys: {
        study: [
          "คณะแพทยศาสตร์ ม.ขอนแก่น 2.8 กม.",
          "วิทยาลัยบัณฑิตเอเชีย 2.4 กม.",
          "ศูนย์แพทยศาสตรศึกษาชั้นคลินิก รพ.ขอนแก่น 2.9 กม.",
        ],
      },
      stores: {
        store: ["-"],
      },
    },
    images: {
      img: [
        "https://scdn.hongpak.in.th/media/rooms/photos/17/1115/091805_2093.jpg",
        "https://scdn.hongpak.in.th/media/rooms/photos/17/1115/091805_5729.jpg",
        "https://scdn.hongpak.in.th/media/rooms/photos/17/1115/091805_1268.jpg",
      ],
    },
    zone: "เมือง",
    detail:
      "ห้องพักกว้าง 3.5*6 ม. มีลานซักล้าง มีห้องน้ำในตัว อยู่ติดกับ รร.เทศบาลโนนชัย มีรถประจำทางผ่านหน้าหอพัก มีที่จอดรถยนต์ ภายในห้องมีมุ้งลวด เหล็กดัด พัดลมให้พร้อม มีกล้องวงจรปิดตู้แดงของตำรวจเพื่อรักษาความปลอดภัย",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15753.79082279035!2d102.81865626896753!3d16.45893272824388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228bccc8cfeeb1%3A0x58d3a221c6df3f6b!2z4Lir4Lit4Lie4Lix4LiB4LiT4Lix4LiQ4Lie4LiH4Lip4LmM!5e0!3m2!1sen!2sth!4v1662550244537!5m2!1sen!2sth",
  });
  NewDorm.save().then((results) => {
    res.send({
      msg: "Created Dorm ",
      data: results,
    });
  });
});

// put = update

// delete
module.exports = router;
