const mongoose = require("mongoose");

const DormSchema = new mongoose.Schema({
    name: String,
    address: {
        number: String,
        novillage: String,
        namevillage: String,
        subdistrict: String,
        district: String,
        province: String,
        zipcode: String,
    },
    contacts: {
        phones: {
            phone: [
                String,
            ]
        },
        email: String,
        facebook: String,
        line: String,
    },
    facilities: {
        private: {
            lift: Boolean,
            air: Boolean,
            wifi: Boolean,
            tv: Boolean,
            waterheater: Boolean,
            keycard: Boolean,
            balcony: Boolean,
            fan: Boolean,
            clothing: Boolean,
            signleBed: Boolean,
            twinBed: Boolean
        },
        public: {
            carpark: Boolean,
            gym: Boolean,
            wifi: Boolean,
            cctv: Boolean,
            washMachine: Boolean
        }
    },
    rules: {
        pet: Boolean,
        smoking: Boolean
    },
    prices: {
        monthly: String,
        daily: String,
        waterBill: String,
        electricBill: String,
        centralBill: String,
        insurance: String
    },
    contracts: {
        contract: [
            String
        ]
    },
    nearbyPlaces: {
        roads: {
          road: [
            String
          ]
        },
        studys: {
          study: [
            String
          ]
        },
        stores: {
          store: [
            String
          ]
        }
      },
      images: {
        img: [
            String
        ]
      },
      zone:  String,
      detail: String,
      map: String
})
module.exports = mongoose.model('projectXML',DormSchema)
