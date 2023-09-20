// npm install express
import express from 'express';
import cors from 'cors';
// dev made
import reviews from "./api/reviews.route.js";

const app = express();

// MIDDLEWARE
app.use(cors());
// allows server to accept json in the body of the request
app.use(express.json());

// setting up endpoints when creating an api (best practice)
app.use('/api/v1/reviews', reviews);
app.use('*', (req, res) => {
    res.status(404).json({error:"not found"});
});

export default app;