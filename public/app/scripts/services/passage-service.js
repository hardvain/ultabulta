angular.module('app').factory('PassageService', function($http,$localStorage,$q){

    return {
        getPassage: function (id) {
            return $http.get("/api/passages/"+id+".json");
        },
        count: function(){
            return $http.get("/api/passages/count");
        }
    };
});
