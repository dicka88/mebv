const mongodb = require('mongodb').MongoClient
const mongoose = require('mongoose')

let url = 'mongodb://localhost:27017/mevb'

mongoose.connect(url)

const conn = mongoose.connection

conn.on('error', console.error.bind(console, 'Error connection'))
conn.once('open', () => {
    console.log("Connection success");
})