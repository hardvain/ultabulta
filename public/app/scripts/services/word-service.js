angular.module('app').factory('WordsService', function($http,$localStorage,$q){

    return {
        getWords: function (page) {
            return $http.get("/api/words.json?page="+page+"&count="+$localStorage.wordsPerPage,{cache:true});
        }
    };
});
