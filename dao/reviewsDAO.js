// where we interact with the database
import mongodb, { ObjectId } from 'mongodb';
//const ObjId = mongodb.ObjectId;  // must search by specific datatype called ObjectID

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) {return;}  // if there is already a database conxn
        try {
            // get access to database
            reviews = await conn.db('reviews').collection('reviews');
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, review, user) {
        try {
            // json parsed obj containing params
            const reviewDoc = {
                movieId: movieId,
                review: review,
                user: user
            }

            // .insertOne() adds to collection
            return await reviews.insertOne(reviewDoc)

        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return {error:e};
        }
    }

    // doesnt work
    static async getReview(reviewId) {
        try {
            const query = { _id: new ObjectId(reviewId) };
            const rev = await reviews.findOne(query);
            //console.log(rev);
            return rev;
        } catch (e) {
            //console.error(`Unable to get review: ${e}`);
            return {error:`Unable to get review: ${e}`};
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            // finding multiple items returns a cursor
            const cursor = await reviews.find(
                { movieId: parseInt(movieId) }
            );

            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e }
        }
    }

    static async updateReview(reviewId, review, user) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } } 
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne(
                { _id: new ObjectId(reviewId) }
            );

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }
}