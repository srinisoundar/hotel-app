import app from '../scripts/app';

const ngModule = angular.mock.module;
const ngInject = angular.mock.inject;

describe('app', () => {

    beforeEach(() => {
      ngModule(app);
    });

    it('expect app to be defined', () => {
        expect(app).toBeDefined();
    })
});