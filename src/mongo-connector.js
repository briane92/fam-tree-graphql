/**
 * Created by beggl on 12/3/2017.
 */
import  MongoClient from 'mongodb'
require('babel-polyfill');


const MONGO_URL = 'mongodb://localhost:27017/famtree'

module.exports = async () => {
    const db = await MongoClient.connect(MONGO_URL);
    return {Users: db.collection('users')};
}

