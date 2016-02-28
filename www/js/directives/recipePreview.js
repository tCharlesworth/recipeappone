angular.module('starter').directive('recipePreview', function() {
    return {
        templateUrl: 'templates/recipePreview.html',
        scope: {
            recipe: '=',
            adder: '&',
            deleter: '&'
        },
        controller: function($scope) {
            $scope.showMe = false;
            var myUpdateFunc = function(value) {
                $scope.showMe = value;
            }
            $scope.adder({newFunc: myUpdateFunc});
            $scope.deleteRecipe = function(recipeId) {
                $scope.deleter({recipeId: recipeId});
            }
        }
    }
});