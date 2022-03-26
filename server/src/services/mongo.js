const mongoose = require('mongoose');
require('dotenv').config()
//console.log(process.env.MONGO_USER)

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.q9oom.mongodb.net/nasa?retryWrites=true&w=majority`


mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect(MONGO_URL);
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}