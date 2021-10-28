var gameApp = angular.module('gameApp', ['ngRoute']);

gameApp.config(function ($routeProvider) {

	$routeProvider
		.when('/start',
			{
				controller: 'GameController',
				templateUrl: 'partials/start.html'
			})
		.when('/memoryGame',
			{
				controller: 'GameController',
				templateUrl: 'partials/memoryGame.html'
			})
		.otherwise({ redirectTo: '/start' });

});
