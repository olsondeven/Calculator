var calcApp = angular.module('calcApp', ['ui.router']);
calcApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/calc');

    $stateProvider
    .state('calc', {
      url: '/calc',
      templateUrl: './views/calculator.html',
      control: 'mainCtrl'
    });

});//closin
