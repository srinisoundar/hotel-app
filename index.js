import ng from 'angular';
import App from './scripts/app';

(() => {
    const element = document.getElementById('hotel-app');
    return ng.bootstrap(element, [App]);
})();