// where we interact with the database
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;  // must search by specific datatype called ObjectID

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

    static async addReview(movieId, user, review) {
        try {
            // json parsed obj containing params
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            // .insertOne() adds to collection
            return await reviews.insertOne(reviewDoc)

        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return {error:e};
        }
    }

    static async getReview(reviewid) {
        try {
            return await reviews.findOne({_id: ObjectId(reviewId)});
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return {error:e};
        }
    }

    static async getReviewsByMovieId(movieId) {
        console.log('mov', movieId);
        try {
            const cursor = await reviews.find(
                { movieId: parseInt(moveId) }
            );

            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review) {
        console.log('rev', reviewId);
        try {
            const updateResponse = await reviews.updateOne(
                { _id: ObjectId(reviewId) },
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
                { _id: ObjectId(reviewId) }
            );

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }
}