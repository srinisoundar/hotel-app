import template from '../../templates/slider-component.html';

const SliderComponent = {
    bindings: {
        images: '<'
    },
    template: template,
    controller: ['$scope', class SliderComponentController {

        constructor($scope) {
            this.$scope = $scope;
        }

        $onInit() {
            this.sliders = [];

            this.images.forEach((image) => {
                this.sliders.push({image, visible: false});
            });

            this.index = 0;
        }

        get index() {
            return this.currentIndex;
        }

        set index(value) {
            this.safeApply(this.$scope, () => {
                this.currentIndex = value;
                this.sliders.forEach(function(image) {
                    image.visible = false;
                });

                this.sliders[this.currentIndex].visible = true;
            });
        }

        safeApply(scope, exp) {
            var phase = scope.$root && scope.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                scope.$eval(exp);
            } else {
                scope.$apply(exp);
            }
        }

        nextImage() {
            return this.index < this.images.length - 1 ? this.index++ : this.index = 0;
        }

        prevImage() {
            return this.index > 0 ? this.index-- : this.index = this.images.length - 1;
        }

    }]
};


export default SliderComponent;
