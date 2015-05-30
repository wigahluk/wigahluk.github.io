/*
    I like to have a routes file completely independent from the application itself,
    just to be clear where I'm defining what
*/
(function (angular) {
    'use strict';

    angular.module('wPage', ['ngRoute', 'angulartics', 'angulartics.google.analytics', 'ngSanitize']).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller:'home/app', // I name the main controller on each page as 'app' as a personal preference.
                    templateUrl:'app/home/app.html'
                })
                .when('/books', {
                    controller:'books/app',
                    templateUrl:'app/books/app.html'
                })
                .when('/about', {
                    controller:'about/app',
                    templateUrl:'app/about/app.html'
                })

                .when('/post/:post', {
                    controller:'controller/post',
                    templateUrl:'src/views/post.html'
                })
                .otherwise({
                    redirectTo:'/'
                });
        }
    ]);

    // In case you want to define some stuff to be available globally, use this.
    angular.module('wPage').run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.appTitle = 'Wigahluk (Oscar Ponce Bañuelos)';
            $rootScope.appTabs = [
                { url: '/', text: 'wigahluk' },
                { url: '/books', text: 'Bookshelf' },
                { url: '/about', text: 'About' }
            ];
        }
    ]);
} (angular));
