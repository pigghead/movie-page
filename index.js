import dotenv from 'dotenv';
import app from './server.js';
import mongodb, { MongoClient } from 'mongodb';
import ReviewsDAO from './dao/reviewsDAO.js';  // dao = data access object, connecting to database

// sets up use for process.env variables (see .env)
dotenv.config();

const mongoClient = mongodb.MongoClient;
const mongo_username = process.env.mongo_username;
const mongo_password = process.env.mongo_password;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rcqf5qq.mongodb.net/?retryWrites=true&w=majority`;
const port = 8000;

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
        await Reviews.injectDB(client);
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`);
        })
    })