
app.controller('PracticeWordsController', function ($scope, $timeout, $q,$mdDialog,$stateParams,words) {

  $scope.words = words.data;

  function DialogController($scope, $mdDialog,word,colour) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.word = word;
    $scope.colour = colour;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  $scope.showWordDetails = function(ev,word) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/app/views/ui/words/word.tmpl.html',
      targetEvent: ev,
      locals:{word:word,colour:$scope.app.setting.theme.primary}
    });
  };
});
