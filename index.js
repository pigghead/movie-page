import dotenv from 'dotenv';
import app from './server.js';
import mongodb, { MongoClient } from 'mongodb';
//import Reviews from './dao/reviewsDAO.js';  // dao = data access object
dotenv.config();

const mongoClient = mongodb.MongoClient;
const mongo_password = process.env.mongo_password;
const mongo_username = process.env.mongo_username;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rcqf5qq.mongodb.net/?retryWrites=true&w=majority`;
const port = 8000;

console.log(uri);

mongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        waitQueueTimeoutMS: 2500
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`);
        })
    })