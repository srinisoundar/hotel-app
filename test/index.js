import 'angular';
import 'angular-mocks/angular-mocks';

const testsContext = [
    require.context('./', true, /^((?![\\/]node_modules[\\/]).)*\.[Ss]pec$/),
    require.context('../scripts/', true, /^((?![\\/]node_modules[\\/]).)*\.[Ss]pec$/)
];

testsContext.forEach(function(context) {
    context.keys().forEach(context);
});