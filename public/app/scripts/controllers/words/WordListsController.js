
app.controller('WordListsController', function ($scope, $timeout, $q,wordsCount,$rootScope) {
  var wordsPerPage = $rootScope.$storage.wordsPerPage;
  $scope.totalWordLists = wordsCount.data.count / wordsPerPage + 1;
});
