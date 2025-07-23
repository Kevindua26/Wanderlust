require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

// Load environment variables from .env file
const MONGO_URL = process.env.MONGO_URL;

main().then(() => {
  console.log('Connected to MongoDB\n');
}).catch((err) => {
  console.log(err);
})

async function main() {
  await mongoose.connect(MONGO_URL);

}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "6880a7315dd9ddb6b79b04ba"}));
  await Listing.insertMany(initData.data);
  console.log("Data initialized successfully");
}

initDB();