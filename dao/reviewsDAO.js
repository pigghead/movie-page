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
            // json parsed obj containing params'
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

        } catch (e) {

        }
    }

    static async getReview(movieId, user, review) {
        try {

        } catch (e) {
            
        }
    }

    static async getReviews(movieId, user, review) {
        try {

        } catch (e) {
            
        }
    }

    static async updateReview(movieId, user, review) {
        try {

        } catch (e) {
            
        }
    }

    static async deleteReview(movieId, user, review) {
        try {

        } catch (e) {
            
        }
    }
}