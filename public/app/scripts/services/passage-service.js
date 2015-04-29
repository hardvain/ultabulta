angular.module('app').factory('PassageService', function($http,$localStorage,$q){

    return {
        count: function(){
            return $http.get("/api/passages/count");
        }
    };
});
