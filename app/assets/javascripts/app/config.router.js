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
    [           '$rootScope', '$state', '$stateParams',
      function ( $rootScope,   $state,   $stateParams ) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
      function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
        $urlRouterProvider
          .otherwise('/app/dashboard');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
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
              data : { title: 'Dashboard' }
            })
            .state('app.wall', {
              url: '/wall',
              templateUrl: '/app/views/pages/dashboard.wall.html',
              data : { title: 'Wall', folded: true }
            })
            .state('app.todo', {
              url: '/todo',
              templateUrl: 'apps/todo/todo.html',
              data : { title: 'Todo', theme: { primary: 'indigo-800'} },
              controller: 'TodoCtrl',
              resolve: load('apps/todo/todo.js')
            })
            .state('app.todo.list', {
                url: '/{fold}'
            })
            .state('app.note', {
              url: '/note',
              templateUrl: 'apps/note/main.html',
              data : { theme: { primary: 'blue-grey'} }
            })
            .state('app.note.list', {
              url: '/list',
              templateUrl: 'apps/note/list.html',
              data : { title: 'Note'},
              controller: 'NoteCtrl',
              resolve: load(['apps/note/note.js', 'moment'])
            })
            .state('app.note.item', {
              url: '/{id}',
              views: {
                '': {
                  templateUrl: 'apps/note/item.html',
                  controller: 'NoteItemCtrl',
                  resolve: load(['apps/note/note.js', 'moment'])
                },
                'navbar@': {
                  templateUrl: 'apps/note/navbar.html',
                  controller: 'NoteItemCtrl'
                }
              },
              data : { title: '', child: true }
            })
          .state('ui', {
            url: '/ui',
            abstract: true,
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
            // components router
            .state('ui.component', {
              url: '/component',
              abstract: true,
              template: '<div ui-view></div>'
            })
              .state('ui.component.arrow', {
                url: '/arrow',
                templateUrl: '/app/views/ui/component/arrow.html',
                data : { title: 'Arrows' }
              })
              .state('ui.component.badge-label', {
                url: '/badge-label',
                templateUrl: '/app/views/ui/component/badge-label.html',
                data : { title: 'Badges & Labels' }
              })
              .state('ui.component.button', {
                url: '/button',
                templateUrl: '/app/views/ui/component/button.html',
                data : { title: 'Buttons' }
              })
              .state('ui.component.color', {
                url: '/color',
                templateUrl: '/app/views/ui/component/color.html',
                data : { title: 'Colors' }
              })
              .state('ui.component.grid', {
                url: '/grid',
                templateUrl: '/app/views/ui/component/grid.html',
                data : { title: 'Grids' }
              })
              .state('ui.component.icon', {
                url: '/icons',
                templateUrl: '/app/views/ui/component/icon.html',
                data : { title: 'Icons' }
              })
              .state('ui.component.list', {
                url: '/list',
                templateUrl: '/app/views/ui/component/list.html',
                data : { title: 'Lists' }
              })
              .state('ui.component.nav', {
                url: '/nav',
                templateUrl: '/app/views/ui/component/nav.html',
                data : { title: 'Navs' }
              })
              .state('ui.component.progressbar', {
                url: '/progressbar',
                templateUrl: '/app/views/ui/component/progressbar.html',
                data : { title: 'Progressbars' }
              })
              .state('ui.component.streamline', {
                url: '/streamline',
                templateUrl: '/app/views/ui/component/streamline.html',
                data : { title: 'Streamlines' }
              })
              .state('ui.component.timeline', {
                url: '/timeline',
                templateUrl: '/app/views/ui/component/timeline.html',
                data : { title: 'Timelines' }
              })
              .state('ui.component.uibootstrap', {
                url: '/uibootstrap',
                templateUrl: '/app/views/ui/component/uibootstrap.html',
                resolve: load('scripts/controllers/bootstrap.js'),
                data : { title: 'UI Bootstrap' }
              })
            // material routers
            .state('ui.material', {
              url: '/material',
              template: '<div ui-view></div>',
              resolve: load('scripts/controllers/material.js')
            })
              .state('ui.material.button', {
                url: '/button',
                templateUrl: '/app/views/ui/material/button.html',
                data : { title: 'Buttons' }
              })
              .state('ui.material.color', {
                url: '/color',
                templateUrl: '/app/views/ui/material/color.html',
                data : { title: 'Colors' }
              })
              .state('ui.material.icon', {
                url: '/icon',
                templateUrl: '/app/views/ui/material/icon.html',
                data : { title: 'Icons' }
              })
              .state('ui.material.card', {
                url: '/card',
                templateUrl: '/app/views/ui/material/card.html',
                data : { title: 'Card' }
              })
              .state('ui.material.form', {
                url: '/form',
                templateUrl: '/app/views/ui/material/form.html',
                data : { title: 'Form' }
              })
              .state('ui.material.list', {
                url: '/list',
                templateUrl: '/app/views/ui/material/list.html',
                data : { title: 'List' }
              })
              .state('ui.material.ngmaterial', {
                url: '/ngmaterial',
                templateUrl: '/app/views/ui/material/ngmaterial.html',
                data : { title: 'NG Material' }
              })
            // form routers
            .state('ui.form', {
              url: '/form',
              template: '<div ui-view></div>'
            })
              .state('ui.form.layout', {
                url: '/layout',
                templateUrl: '/app/views/ui/form/layout.html',
                data : { title: 'Layouts' }
              })
              .state('ui.form.element', {
                url: '/element',
                templateUrl: '/app/views/ui/form/element.html',
                data : { title: 'Elements' }
              })              
              .state('ui.form.validation', {
                url: '/validation',
                templateUrl: '/app/views/ui/form/validation.html',
                data : { title: 'Validations' }
              })
              .state('ui.form.select', {
                url: '/select',
                templateUrl: '/app/views/ui/form/select.html',
                data : { title: 'Selects' },
                controller: 'SelectCtrl',
                resolve: load('scripts/controllers/select.js')
              })
              .state('ui.form.editor', {
                url: '/editor',
                templateUrl: '/app/views/ui/form/editor.html',
                data : { title: 'Editor' },
                controller: 'EditorCtrl',
                resolve: load('scripts/controllers/editor.js')
              })
              .state('ui.form.slider', {
                url: '/slider',
                templateUrl: '/app/views/ui/form/slider.html',
                data : { title: 'Slider' },
                controller: 'SliderCtrl',
                resolve: load('scripts/controllers/slider.js')
              })
              .state('ui.form.tree', {
                url: '/tree',
                templateUrl: '/app/views/ui/form/tree.html',
                data : { title: 'Tree' },
                controller: 'TreeCtrl',
                resolve: load('scripts/controllers/tree.js')
              })
              .state('ui.form.file-upload', {
                url: '/file-upload',
                templateUrl: '/app/views/ui/form/file-upload.html',
                data : { title: 'File upload' },
                controller: 'UploadCtrl',
                resolve: load(['angularFileUpload', 'scripts/controllers/upload.js'])
              })
              .state('ui.form.image-crop', {
                url: '/image-crop',
                templateUrl: '/app/views/ui/form/image-crop.html',
                data : { title: 'Image Crop' },
                controller: 'ImgCropCtrl',
                resolve: load(['ngImgCrop','scripts/controllers/imgcrop.js'])
              })
              .state('ui.form.editable', {
                url: '/editable',
                templateUrl: '/app/views/ui/form/xeditable.html',
                data : { title: 'Xeditable' },
                controller: 'XeditableCtrl',
                resolve: load(['xeditable','scripts/controllers/xeditable.js'])
              })
            // table routers
            .state('ui.table', {
              url: '/table',
              template: '<div ui-view></div>'
            })
              .state('ui.table.static', {
                url: '/static',
                templateUrl: '/app/views/ui/table/static.html',
                data : { title: 'Static', theme: { primary: 'blue'} }
              })
              .state('ui.table.smart', {
                url: '/smart',
                templateUrl: '/app/views/ui/table/smart.html',
                data : { title: 'Smart' },
                controller: 'TableCtrl',
                resolve: load(['smart-table', 'scripts/controllers/table.js'])
              })
              .state('ui.table.datatable', {
                url: '/datatable',
                data : { title: 'Datatable' },
                templateUrl: '/app/views/ui/table/datatable.html'
              })
              .state('ui.table.footable', {
                url: '/footable',
                data : { title: 'Footable' },
                templateUrl: '/app/views/ui/table/footable.html'
              })
              .state('ui.table.nggrid', {
                url: '/nggrid',
                templateUrl: '/app/views/ui/table/nggrid.html',
                data : { title: 'NG Grid' },
                controller: 'NGGridCtrl',
                resolve: load(['ngGrid','scripts/controllers/nggrid.js'])
              })
              .state('ui.table.uigrid', {
                url: '/uigrid',
                templateUrl: '/app/views/ui/table/uigrid.html',
                data : { title: 'UI Grid' },
                controller: "UiGridCtrl",
                resolve: load(['ui.grid', 'scripts/controllers/uigrid.js'])
              })
              .state('ui.table.editable', {
                url: '/editable',
                templateUrl: '/app/views/ui/table/editable.html',
                data : { title: 'Editable' },
                controller: 'XeditableCtrl',
                resolve: load(['xeditable','scripts/controllers/xeditable.js'])
              })
            // chart
            .state('ui.chart', {
              url: '/chart',
              templateUrl: '/app/views/ui/chart/chart.html',
              data : { title: 'Charts' },
              resolve: load('scripts/controllers/chart.js')
            })
            // map routers
            .state('ui.map', {
              url: '/map',
              template: '<div ui-view></div>'
            })
              .state('ui.map.google', {
                url: '/google',
                templateUrl: '/app/views/ui/map/google.html',
                data : { title: 'Gmap' },
                controller: 'GoogleMapCtrl',
                resolve: load(['ui.map', 'scripts/controllers/load-google-maps.js', 'scripts/controllers/googlemap.js'], function(){ return loadGoogleMaps(); })
              })
              .state('ui.map.vector', {
                url: '/vector',
                templateUrl: '/app/views/ui/map/vector.html',
                data : { title: 'Vector' },
                controller: 'VectorMapCtrl',
                resolve: load('scripts/controllers/vectormap.js')
              })

          .state('page', {
            url: '/page',
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
            .state('page.profile', {
              url: '/profile',
              templateUrl: '/app/views/pages/profile.html',
              data : { title: 'Profile', theme: { primary: 'green'} }
            })
            .state('page.settings', {
              url: '/settings',
              templateUrl: '/app/views/pages/settings.html',
              data : { title: 'Settings' }
            })
            .state('page.blank', {
              url: '/blank',
              templateUrl: '/app/views/pages/blank.html',
              data : { title: 'Blank' }
            })
            .state('page.document', {
              url: '/document',
              templateUrl: '/app/views/pages/document.html',
              data : { title: 'Document' }
            })
            .state('404', {
              url: '/404',
              templateUrl: '/app/views/pages/404.html'
            })
            .state('505', {
              url: '/505',
              templateUrl: '/app/views/pages/505.html'
            })
            .state('access', {
              url: '/access',
              template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
            })
            .state('access.signin', {
              url: '/signin',
              templateUrl: '/app/views/pages/signin.html'
            })
            .state('access.signup', {
              url: '/signup',
              templateUrl: '/app/views/pages/signup.html'
            })
            .state('access.forgot-password', {
              url: '/forgot-password',
              templateUrl: '/app/views/pages/forgot-password.html'
            })
            .state('access.lockme', {
              url: '/lockme',
              templateUrl: '/app/views/pages/lockme.html'
            })
          ;


          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
      }
    ]
  );
