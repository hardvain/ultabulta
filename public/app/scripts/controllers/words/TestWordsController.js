app.controller('TestWordsController', function ($scope, $timeout, $q, $stateParams, words, $state) {
    $scope.words = words.data;
    $scope.currentQuestion = '';
    $scope.currentAnswer = '';
    $scope.isQuestionEmpty = true;
    $scope.isAnswerEmpty = true;
    $scope.questionTypes = ['Word', 'Meanings', 'Examples', 'Random'];
    $scope.isRandomSelected = false;
    $scope.wrongAnswerIds = [];
    $scope.questionSelected = function () {
        $scope.isQuestionEmpty = false;
        $scope.answerTypes = populateCorrespondingAnswerTypes();
    };

    $scope.answerSelected = function () {
        $scope.isAnswerEmpty = false;
    };

    $scope.validateAnswer = function (selectedAnswerIndex) {

        if (!($scope.answers[selectedAnswerIndex] === $scope.currentAnswer)) {
            $scope.wrongAnswerIds.push($scope.currentWord['id']);
        }
        $scope.proceed();
    };

    $scope.startTest = function () {
        $scope.isTestStarted = true;
        $scope.populateQuestionAndAnswer();
    };
    $scope.answers = [];
    $scope.proceed = function () {
        $scope.answers = [];
        $scope.populateQuestionAndAnswer();
    };
    var randomizedQnIndices = _.shuffle(_.range($scope.words[0]['id'], $scope.words[$scope.words.length - 1]['id']));
    $scope.populateQuestionAndAnswer = function () {
        $scope.progressPercentage = $scope.words.length / randomizedQnIndices.length;
        if (randomizedQnIndices.length > 0) {
            var currentQuestionIndex = randomizedQnIndices.pop();
            $scope.currentWord = _.where($scope.words, {id: currentQuestionIndex})[0];
            if ($scope.isRandomSelected) {
                var collection = ['Word', 'Meanings', 'Examples'];
                $scope.selectedQuestionType = _.shuffle(collection)[0];
                _.remove(collection, function (type) {
                    return type === $scope.selectedQuestionType;
                });
                $scope.selectedAnswerType = _.shuffle(collection)[0];
            }
            if ($scope.selectedQuestionType === 'Word') {
                $scope.currentQuestion = $scope.currentWord.name;
            } else {
                $scope.currentQuestion = $scope.currentWord[$scope.selectedQuestionType.toLowerCase()][0].content.replace($scope.currentWord['word'], " _______ ");
            }
            populateRandomAnswers($scope.currentWord['id']);
        } else {
            console.log($scope.wrongAnswerIds);
            $state.go('app.wordlists.show', {id: $stateParams.id});
        }
    };

    var populateRandomAnswers = function (answerId) {
        var words = $scope.words;

        var randomNValues = getRandomNValues(words[0]['id'], words[words.length - 1]['id'], 4);
        if (!_.contains(randomNValues, answerId)) {
            var answers = {};
            if ($scope.selectedAnswerType === 'Word') {
                answers = $scope.currentWord.name;
                $scope.answers.push(answers);
                $scope.currentAnswer = answers;
            } else if ($scope.selectedAnswerType === 'Random') {
                var collection = ['Word', 'Meanings', 'Examples'];
                _.remove(collection, function (type) {
                    return type === $scope.selectedQuestionType;
                });
                $scope.selectedAnswerType = _.shuffle(collection)[0];
                answers = $scope.currentWord[$scope.selectedAnswerType.toLowerCase()];
                var answerIndex = getRandomNValues(0, answers.length, 1);
                $scope.currentAnswer = answers[answerIndex].content;
                $scope.answers.push($scope.currentAnswer);
            } else {
                answers = $scope.currentWord[$scope.selectedAnswerType.toLowerCase()];
                var answerIndex = getRandomNValues(0, answers.length, 1);
                $scope.currentAnswer = answers[answerIndex].content;
                $scope.answers.push($scope.currentAnswer);
            }
        }
        _.each(randomNValues, function (value) {
            if ($scope.selectedAnswerType === 'Word') {
                $scope.answers.push(_.where($scope.words, {id: value})[0].name);
            } else {
                var answerOptions = _.where($scope.words, {id: value})[0][$scope.selectedAnswerType.toLowerCase()];
                var randomAnswerIndex = getRandomNValues(0, answerOptions.length, 1);
                $scope.answers.push(answerOptions[randomAnswerIndex].content);
            }
        });
        $scope.answers = _.shuffle($scope.answers);
        console.log($scope.answers);

    };

    var populateCorrespondingAnswerTypes = function () {
        var answerTypes = [];
        if ($scope.selectedQuestionType === 'Word') {
            answerTypes = ['Meanings', 'Examples', 'Random']
        } else if ($scope.selectedQuestionType === 'Meanings') {
            answerTypes = ['Word', 'Examples', 'Random']
        } else if ($scope.selectedQuestionType === 'Examples') {
            answerTypes = ['Word', 'Meanings', 'Random']
        } else {
            $scope.isRandomSelected = true;
            answerTypes = ['Random']
        }
        return answerTypes;
    };

    var getRandomNValues = function (min, max, count) {
        return _.take(_.shuffle(_.range(min, max)), count);
    };
});
