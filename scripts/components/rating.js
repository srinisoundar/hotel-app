import template from '../../templates/rating-component.html';

const RatingComponent = {
    bindings: {
        range: '<',
        stars: '<'
    },
    template: template,
    controller: class RatingComponentController {

        $onInit() {
            this.ratings = [];
            for(let i=0; i < this.range; i++) {
                if(i < this.stars){
                    this.ratings[i] = true;
                }else {
                    this.ratings[i] = false;
                }
            }
        }

    }
};


export default RatingComponent;
