// Dependencies
const mongoose = require('mongoose')
const db = mongoose.connection

// Config
const mongoURI =  process.env.DATABASE_URL || 'mongodb://localhost:27017/hotel'

// Models
const Hotel = require('./models/hotel.js')
const hotelSeed = require('./models/seed.js')

// Connect to Mongo
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
mongoose.connect(mongoURI, connectionOptions,
  () => {
    console.log('Mongo running at', mongoURI);
  }
)

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

// WRITE QUERIES HERE
// Store the result of each query inside the queryResults array
const queryResults = [];

async function runQueries(){
  await Hotel.create(hotelSeed)
  //  queryResults[0]: find all the hotels
  //  Your code should look like the following:
  //  queryResults[0] = await .........
  queryResults[0] = await Hotel.find({});

  //  queryResults[1]: find all the hotels but only return the hotel name
  //  queryResults[1] = await .......
  queryResults[1] = await Hotel.find({}, 'name')

  //  queryResults[2]: create a new hotel with your name
  queryResults[2] = await Hotel.create({name:"The Crossroads Inn", rating: 2})

  //  queryResults[3]: find just your newly created hotel using a search parameter that would only match your hotel
  queryResults[3] = await Hotel.findOne({name: "The Crossroads Inn"})

  // queryResults[4]: find all the hotels that have vacancies
  queryResults[4] = await Hotel.find({vacancies: true})

  // queryResults[5]: turns out Hotelicopter was an April Fool's prank! Let's delete that one from our database
  queryResults[5] = await Hotel.findOneAndRemove({name: 'Hotelicopter'})

  // queryResults[6]: Our Agency founder demands we delete the hotel located in "Colorado Rockies" but can't remember which hotel that is
  // find and delete whichever hotel has the location "Colorado Rockies"
  queryResults[6] = await Hotel.findOneAndRemove({location: "Colorado Rockies"})

  // queryResults[7]: The Great Northern is now a sponsor of our company! Update the Great Northern's rating from 3 to 5.
  // Be sure the query returns the updated version of the hotel
  queryResults[7] = await Hotel.findOneAndUpdate(
    { name: 'The Great Northern'},
    { $inc: { rating: 2}},
    { new: true}
  )

  // queryResults[8]: Motel Bambi is now fully booked, change the vacancies to false
  // Once again, return the updated version of the hotel
  queryResults[8] = await Hotel.findOneAndUpdate(
    {name: "Motel Bambi"},
    { $set: { vacancies: false }},
    { new: true }
  )

  return queryResults;
}

module.exports = runQueries

