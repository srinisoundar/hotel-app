import angular from 'angular';
import {MODULE} from './constants';
//styles
import '../styles/index.scss';
//services
import HotelService from './services/hotel';
import ReviewService from './services/review';
//controllers
import HotelCtrl from './controllers/hotel';
//components
import RatingComponent from './components/rating';
import ReviewComponent from './components/review';
import MessageComponent from './components/message';
import SliderComponent from './components/slider';
//filters
import Capitalize from './filters/capitalize';



export default angular.module(MODULE.HOTEL, [])
    .factory('HotelService', ['$http', HotelService])
    .factory('ReviewService', ['$http', ReviewService])
    .filter('capitalize', Capitalize)
    .component('hotelRating', RatingComponent)
    .component('hotelReview', ReviewComponent)
    .component('hotelMessage', MessageComponent)
    .component('hotelSlider', SliderComponent)
    .controller('HotelCtrl', ['HotelService', 'ReviewService', '$scope', HotelCtrl])
    .name;
