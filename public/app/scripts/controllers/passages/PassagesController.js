
app.controller('PassagesController', function ($scope,passagesCount) {
    $scope.totalPassages = passagesCount.data.count;
});
