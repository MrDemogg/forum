const bcrypt = require('bcrypt')
const {MongoClient, ObjectId} = require('mongodb')
const {v4} = require('uuid')

const client = new MongoClient('mongodb://localhost:27017')

const mongoHandler = {

}

module.exports = mongoHandler