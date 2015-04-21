
app.controller('WordController', function ($scope, $timeout, $q, $stateParams, $state, ngDialog,word) {
  $scope.word = word.data;
  $scope.id = $stateParams.id;
  $scope.previousWord = function () {
    $state.go("app.words.word", {id: parseInt($stateParams.id) - 1})
  };

  $scope.nextWord = function () {
    $state.go("app.words.word", {id: parseInt($stateParams.id) + 1})
  };
});