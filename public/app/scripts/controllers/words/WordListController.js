

app.controller('WordListController', function ($scope, $timeout, $q,words,$stateParams) {
  $scope.words = words.data;
  $scope.id = $stateParams.id;
  var getAlphabetsCount = function(words){
    var wordsCount = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0};
    _.each(words, function(word){
      var firstLetter = word['name'][0];
      wordsCount[firstLetter] = wordsCount[firstLetter]+1
    });
    return wordsCount;
  };
  $scope.alphabets = getAlphabetsCount($scope.words);

});
