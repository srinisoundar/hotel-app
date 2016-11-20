import template from '../../templates/review-component.html';

const ReviewComponent = {
    bindings: {
        reviews: '<'
    },
    template: template,
    controller: class ReviewComponentController {}
};


export default ReviewComponent;
