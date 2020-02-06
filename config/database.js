const mongodb = require('mongodb').MongoClient

let url = 'mongodb://localhost:27017/mevb'

const connect = () => {
    return new Promise(res => {
        mongodb.connect(url, (err, client) => {
            if (err) return console.log("MongoDb is not connected")
            console.log("Mongo db connected")
            res(client.db('mevb'))
        })
    })
}

module.exports = {
    connect
}