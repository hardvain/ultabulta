
app.controller('ReadWordsController', function ($scope, $timeout, $q,$rootScope,$stateParams,words) {
  $scope.words = words.data;

  $scope.hiddenCards = [];
  $scope.removeCard = function(index){
    $scope.hiddenCards.push(index);
    $scope.words = _.filter($scope.words,function(word){return word.id !== index})
  }
});
