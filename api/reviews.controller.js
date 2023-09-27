import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {  // assuming next is a best practice
        try {
            const movieId = req.body.movieId;  // body is the json part of the review
            const review = req.body.review;
            const user = req.body.user;

            // console.log(`${movieId}::${user}::${review}`);

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                review,
                user
            );
            res.json({status: 'success'});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            // we know the req.params.id exists
            let id = req.params.id || {};  // params are what are found in the url (:id,etc)
            let review = await ReviewsDAO.getReview(id);
            if(!review) {
                res.status(404).json({error: 'Not found'});
                return;
            }
            res.json(review)
        } catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = ReviewsDAO.updateReview(
                reviewId,
                review,
                user
            );

            var {error} = reviewResponse;
            if(error) {
                res.status(400).json({error});
            }

            if (reviewResponse === 0) {
                throw new Error(
                    'unable to update review'
                );
            }
        } catch (e) {
            res.status(500).json({error: e.message}); 
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);  // why put this in a const?
            if(reviewResponse === 0) {
                throw new Error('unable to delete review');
            } else {
                res.json({status: 'success'});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if(!reviews) {
                res.status(404).json({status: 'unable to get reviews for movie'});
                return;
            }
            res.json(reviews);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}