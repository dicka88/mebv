const mongoose = require('mongoose')

let url = 'mongodb://localhost:27017/mevb'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const conn = mongoose.connection

conn.on('error', console.error.bind(console, 'Mongodb: Connection failed <<!! WARNING>>'))
conn.once('open', () => {
    console.log("Mongodb: Connection success");
})