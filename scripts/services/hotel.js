import {URL} from '../constants';

/**
 * Factory for hotel services
 * @param $http
 * @returns {{getHotels: (function(*=))}}
 * @constructor
 */
const HotelService = ($http) => {

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
     * @returns {Promise.<*>}
     */
    const onError = () => {
      return Promise.reject('An error occurred. Please try again.');
    };

    /**
     * Service to get the list of hotels
     * @param params
     * @returns Promise
     */
    const getHotels = (params) => {
        const config = {params};

        return $http.get(URL.HOTEL, config)
           .then(normalize)
           .catch(onError);
    };

    return {
        getHotels
    };
};

export default HotelService;