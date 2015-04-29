'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
  .run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
)
  .config(
  ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
    function ($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
      $urlRouterProvider
        .otherwise('/dashboard');
      $stateProvider
        .state('app', {
          abstract: true,
          url: '',
          views: {
            '': {
              templateUrl: '/app/views/layout.html'
            },
            'aside': {
              templateUrl: '/app/views/aside.html'
            },
            'content': {
              templateUrl: '/app/views/content.html'
            }
          }
        })

        .state('app.dashboard', {
          url: '/dashboard',
          templateUrl: '/app/views/pages/dashboard.html',
          data: {title: 'Dashboard'},
          controller:'DashboardController',
          resolve: load(['/app/scripts/controllers/dashboard.js','/app/scripts/controllers/chart.js', '/app/scripts/controllers/vectormap.js'])
        })
        .state('app.settings', {
          url: '/settings',
          templateUrl: '/app/views/pages/settings.html',
          data: {title: 'Settings'},
          controller:'SettingsController',
          resolve: load('/app/scripts/controllers/settings.js')
        })
          .state('app.verbal', {
            url: '',
            template: '<div ui-view></div>',
            abstract:true
          })
        .state('app.verbal.words', {
          url: '/words',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.verbal.words.word', {
          url: '/:id',
          templateUrl: '/app/views/ui/words/word.html',
          controller: 'WordController',
          data: {title: 'Word Lists - Test Mode'},
          resolve: {
            word : function($http,$stateParams){
              return $http.get("/api/words/"+$stateParams.id+".json")
            },
            deps: load('/app/scripts/controllers/words/WordController.js').deps
          }
        })
        .state('app.verbal.wordlists', {
          url: '/wordlists',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.verbal.wordlists.list', {
          url: '/',
          templateUrl: '/app/views/ui/words/word-lists.html',
          controller: 'WordListsController',
          data: {title: 'Word Lists - Test Mode'},
          resolve:{
            wordsCount :function(WordsService){
              return WordsService.count();
            },
            deps: load(['/app/scripts/controllers/words/WordListsController.js','/app/scripts/directives/range.js']).deps
          }
        })
        .state('app.verbal.wordlists.show', {
          url: '/:id',
          templateUrl: '/app/views/ui/words/word-list.html',
          controller: 'WordListController',
          data: {title: 'Word List Statistics'},
          resolve:{
            words : function(WordsService,$stateParams){
              return WordsService.getWords($stateParams.id);
            },
            deps: load('/app/scripts/controllers/words/WordListController.js').deps
          }
        })
        .state('app.verbal.wordlists.read', {
          url: '/:id/read',
          templateUrl: '/app/views/ui/words/read.html',
          controller: 'ReadWordsController',
          data: {title: 'Read Mode'},
          resolve:{
            words : function(WordsService,$stateParams){
              return WordsService.getWords($stateParams.id);
            },
            deps: load('/app/scripts/controllers/words/ReadWordsController.js').deps
          }
        })
        .state('app.verbal.wordlists.practice', {
          url: '/:id/practice',
          templateUrl: '/app/views/ui/words/practice.html',
          controller: 'PracticeWordsController',
          data: {title: 'Practice Mode'},
          resolve:{
            words : function(WordsService,$stateParams){
              var data = WordsService.getWords($stateParams.id);
              return data;
            },
            deps: load('/app/scripts/controllers/words/PracticeWordsController.js').deps
          }
        })
        .state('app.verbal.wordlists.test', {
          url: '/:id/test',
          templateUrl: '/app/views/ui/words/test.html',
          controller: 'TestWordsController',
          data: {title: 'Test Mode'},
          resolve:{
            words : function(WordsService,$stateParams){
              var data = WordsService.getWords($stateParams.id);
                return data;
            },
            deps: load('/app/scripts/controllers/words/TestWordsController.js').deps
          }
        });


      function load(srcs, callback) {
        return {
          deps: ['$ocLazyLoad', '$q',
            function ($ocLazyLoad, $q) {
              var deferred = $q.defer();
              var promise = false;
              srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
              if (!promise) {
                promise = deferred.promise;
              }
              angular.forEach(srcs, function (src) {
                promise = promise.then(function () {
                  angular.forEach(MODULE_CONFIG, function (module) {
                    if (module.name == src) {
                      if (!module.module) {
                        name = module.files;
                      } else {
                        name = module.name;
                      }
                    } else {
                      name = src;
                    }
                  });
                  return $ocLazyLoad.load(name);
                });
              });
              deferred.resolve();
              return callback ? promise.then(function () {
                return callback();
              }) : promise;
            }]
        }
      }
    }
  ]
);
