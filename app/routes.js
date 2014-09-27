/*
    I like to have a routes file completely independent from the application itself,
    just to be clear where I'm defining what
*/
(function (angular) {
    'use strict';

    angular.module('wPage', ['ngRoute']).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                controller:'home/app', // I name the main controller on each page as 'app' as a personal preference.
                templateUrl:'app/home/app.html'
            })
                .otherwise({
                    redirectTo:'/'
                });
        }
    ]);

    // In case you want to define some stiff to be available globally, use this.
    angular.module('wPage').run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.appTitle = 'Wigahluk (Oscar Ponce Bañuelos)';
        }
    ])
} (angular));