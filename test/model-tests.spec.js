const expect = require('chai').expect;
const Hotel = require('../models/hotel');
describe('Hotel schema', function() {
    it('should work as expected with good inputs', function(done){
        const overLook = new Hotel({
            "name": "Overlook Hotel",
            "location": "Colorado Rockies",
            "rating": 3,
            "vacancies": true,
            "rooms": [
              {
                "roomNumber": 102,
                "size": "Queen Double",
                "price": 559,
                "booked": true
              },
              {
                "roomNumber": 202,
                "size": "King Suite",
                "price": 658,
                "booked": false
              },
              {
                "roomNumber": 404,
                "size": "Queen Double",
                "booked": false
              },
              {
                "roomNumber": 605,
                "size": "King Suite",
                "price": 658,
                "booked": true
              },
              {
                "roomNumber": 777,
                "size": "Penthouse",
                "price": 1888,
                "booked": false
              }
            ],
            "tags": [
              "snowbound",
              "redrum",
              "Kubrick & King"
            ]
          });
        overLook.validate(function(err){
            expect(err).to.not.exist;
            expect(overLook.name).to.eq('Overlook Hotel');
            expect(overLook.rooms.length > 2)
            done();
        })
    })
    it('should be invalid if name is empty', function(done) {
        const noNameMotel = new Hotel();
        noNameMotel.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
    it('should be invalid if the rating is above 5', function(done){
        const shillMotel = new Hotel({
            name: 'Totally Real Resort',
            rating: 6,
        });
        shillMotel.validate(function(err){
            expect(err.errors.rating).to.exist;
            done();
        })
    });
    it("should only accept a string for a location", function(done){
        const falseNameHotel = new Hotel({
            name: { decidedYet: false }
        });
        falseNameHotel.validate(function(err){
            expect(err.errors.name).to.exist;
            expect(err.errors.name.kind).to.eq('string');
            done()
        })
    })
    it("should only accept a number for a rating", function(done){
        const poorlyReviewedHotel = new Hotel({
            name: "Fyre Island",
            rating: "Terrible!"
        });
        poorlyReviewedHotel.validate(function(err){
            expect(err.errors.rating).to.exist;
            expect(err.errors.rating.kind).to.eq('Number');
            done()
        })
    })
    it("should only accept a boolean for vacancies", function(done){
        const popularResort = new Hotel({
            vacancies: 2
        });
        popularResort.validate(function(err){
            expect(err.errors.vacancies).to.exist;
            expect(err.errors.vacancies.kind).to.eq('Boolean');
            done()
        })
    })
    it("should only accept an array of strings for tags", function(done){
        const notArray = new Hotel({
            tags: {description: "Cool and Luxurious"}
        });
        const notStrings = new Hotel({
            tags: ["cool",{user: "badReviewer"},7]
        })
        notArray.validate(function(err){
            expect(err.errors["tags.0"]).to.exist;
            notStrings.validate(function(err){
                expect(err.errors["tags.1"]).to.exist;
                done()
            })
        })
    })
    it("should accept a list of subdocuments with specific property types for rooms", function(done){
        // { roomNumber: Number, size: String, price: Number, booked: Boolean }
        const roomyHotel = new Hotel({
            name: "Roomy Inn",
            rooms: [{roomNumber: "one-hundred-eleventy", size: {type: "XL"}, price: "too dang high", booked: "Until July"}]
        });
        roomyHotel.validate(function(err){
            expect(err.errors["rooms.0.roomNumber"]).to.exist;
            expect(err.errors["rooms.0.roomNumber"].kind).to.eq('Number');
            expect(err.errors["rooms.0.size"]).to.exist;
            expect(err.errors["rooms.0.size"].kind).to.eq('string');
            expect(err.errors["rooms.0.price"]).to.exist;
            expect(err.errors["rooms.0.price"].kind).to.eq('Number');
            expect(err.errors["rooms.0.booked"]).to.exist;
            expect(err.errors["rooms.0.booked"].kind).to.eq('Boolean');
            expect(err.errors["rooms.0.roomNumber"]).to.exist;
            done()
        })
    })
})