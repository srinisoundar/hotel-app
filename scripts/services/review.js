import {URL} from '../constants';

/**
 * Factory for review services
 * @param $http
 * @returns {{getReviews: (function(*=))}}
 * @constructor
 */
const ReviewService = ($http) => {

    /**
     * Method to be called after success to normalize data
     * @param res - raw response
     * @returns {Promise.<*>}
     */
    const normalize = (res) => {
        let {data} = res;
        if(Array.isArray(data)){
            return Promise.resolve(data);
        } else {
            return Promise.reject('Technical error! Please try again later.');
        }
    };

    /**
     * method to be called on error
     * @param res - raw response
     * @returns {Promise.<*>}
     */
    const onError = () => {
        return Promise.reject('An error occurred. Please try again.');
    };

    /**
     * Service to get the review
     * @param params
     * @returns Promise
     */
    const getReviews = (params) => {
        const config = {params};

        return $http.get(URL.REVIEW, config)
            .then(normalize)
            .catch(onError);
    };

    return {
        getReviews
    };
};

export default ReviewService;