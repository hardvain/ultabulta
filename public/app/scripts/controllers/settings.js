app.controller('SettingsController', ['$scope','$rootScope','$localStorage', function($scope,$rootScope,$localStorage) {
  $scope.clearStorage = function(){
    $localStorage.appSetting.isRefreshed = true;
    $rootScope.setAppSettings();
  }
}]);
