
app.controller('WordController', function ($scope, $timeout, $q, $stateParams, $state, ngDialog,word) {
  $scope.word = word.data;
  $scope.id = $stateParams.id;
  $scope.previousWord = function () {
    $state.go("app.verbal.words.word", {id: parseInt($stateParams.id) - 1})
  };

  $scope.nextWord = function () {
    $state.go("app.verbal.words.word", {id: parseInt($stateParams.id) + 1})
  };

  $scope.delete = function(id,type){
  };

  $scope.edit = function(id,type){
    console.log('editing '+ id +' type: '+type);
  }
});
