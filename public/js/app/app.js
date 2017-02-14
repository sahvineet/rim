(function() {
    'use strict';
    angular
        .module('demoApp', [
            'ui.router'
        ]);


    angular
        .module('demoApp')
        .run(runBlock)
        .config(config);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams'];

    function runBlock($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/app');
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'views/home.html',
                data: { title: 'Home' },
                controller: "HomeCtrl"
            })
    }

})();
