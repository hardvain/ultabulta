app.controller('SettingsController', ['$scope','$rootScope','$localStorage', function($scope,$rootScope,
        $localStorage) {
  $scope.updateWordsPerPageCount = function(){
    $rootScope.$storage.wordsPerPage = $scope.wordsPerPage;
  };
  $scope.clearStorage = function(){
    $localStorage.appSetting.isRefreshed = true;
    $rootScope.setAppSettings();
  }
}]);
