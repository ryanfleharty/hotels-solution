const expect = require('chai').expect
const assert = require('chai').assert
const mongoUnit = require('mongo-unit');
let queryResults = [];

describe("The queries", async function(){
    after(() => {
        console.log('Mongo simulator stopped')
        mongoUnit.stop()
        return
    })
    it("should return the right stuff from the seed data for query one", ()=>{
        const runQueries = require('../app')
        return runQueries().then(result => {
            queryResults = result;
            assert.equal(queryResults[0].length, 12)
        })
    })
    it("should return just the names of hotels for query two", ()=>{
        assert.equal(queryResults[1].length, 12)
        queryResults[1].forEach((hotel)=>{
            const cleanHotel = JSON.parse(JSON.stringify(hotel))
            assert(cleanHotel.hasOwnProperty("name"))
            assert(!cleanHotel.hasOwnProperty("vacancies"))
            assert(!cleanHotel.hasOwnProperty("rating"))
        })
    })
    it("should return one newly created hotel for query three", ()=>{
        queryResults[2] = JSON.parse(JSON.stringify(queryResults[2]))
        assert(queryResults[2].hasOwnProperty("name"))
    })
    it("should find the newly created hotel for query four", ()=>{
        queryResults[3] = JSON.parse(JSON.stringify(queryResults[3]))
        assert.equal(JSON.stringify(queryResults[2]), JSON.stringify(queryResults[3]))
    })
    it("should only find hotels with vacancies in query five", ()=>{
        assert(queryResults[4].length > 3)
        queryResults[4].forEach((hotel)=>{
            assert(hotel.vacancies)
        })
    })
    it("should delete Hotelicopter for query six", ()=>{
        queryResults[5] = JSON.parse(JSON.stringify(queryResults[5]))
        assert.equal(queryResults[5].name, "Hotelicopter")
    })
    it("should delete the hotel in the Rockies for query seven", ()=>{
        queryResults[6] = JSON.parse(JSON.stringify(queryResults[6]))
        assert.equal(queryResults[6].location, "Colorado Rockies")
    })
    it("should update the Great Northern's rating for query eight", ()=>{
        queryResults[7] = JSON.parse(JSON.stringify(queryResults[7]))
        assert.equal(queryResults[7].rating, 5)
        assert.equal(queryResults[7].name, "The Great Northern")
    })
    it("should updated the Great Northern's rating for query nine", ()=>{
        queryResults[8] = JSON.parse(JSON.stringify(queryResults[8]))
        assert.equal(queryResults[8].vacancies, false)
        assert.equal(queryResults[8].name, "Motel Bambi")
    })


})