
app.controller('PassageController', function ($scope,passage) {
    $scope.passage = passage.data;
    console.log(passage);
});
