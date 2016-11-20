import {DATE_FORMAT} from '../constants';

class HotelController {

    constructor(HotelService, ReviewService, $scope) {
        this.hotelService = HotelService;
        this.reviewService = ReviewService;
        this.$scope = $scope;
    }

    $onInit() {
        this.hotels = [];
        this.hotelReviews = {};
        this.hideReviews = {};
        this.message = '';
        this.isLoading = false;
        this.isError = false;
        this.dateFormat = DATE_FORMAT;
    }

    /**
     * Loads a random 5 hotels on click
     * @returns Promise
     */
    loadHotels() {
        const params = {count: 5/*, force_error: 1*/};

        this.message = '';
        this.hotels = [];
        this.isLoading = true;
        return this.hotelService.getHotels(params)
            .then((hotels) => {
                if (hotels.length === 0) {
                    this.isError = false;
                    this.message = 'No hotels found';
                }
                this.hotels = hotels;
            })
            .catch((message) => {
                this.isError = true;
                this.message = message;
            })
            .then(() => this.isLoading = false);
    }

    /**
     * Method to toggle the reviews
     * @param id
     */
    toggleReview(id) {
        const params = {hotel_id: id};

        this.hideReviews[id] = !this.hideReviews[id];

        if (this.hotelReviews.hasOwnProperty(id)) {
            this.hotelReviews[id].show = !this.hotelReviews[id].show;
        } else {
            this.hotelReviews[id] = {show: false, isError: false, isLoading: true};

            this.reviewService.getReviews(params)
                .then((reviews) => {
                    if (reviews.length === 0) {
                        this.hotelReviews[id].message = 'No reviews found';
                    }
                    this.hotelReviews[id].reviews = reviews;
                    this.hotelReviews[id].show = true;
                })
                .catch(() => {
                    this.hotelReviews[id].isError = true;
                    this.hotelReviews[id].message = 'An error occurred. Please try again.';
                })
                .then(() => this.hotelReviews[id].isLoading = false);
        }
    }
}

export default HotelController;