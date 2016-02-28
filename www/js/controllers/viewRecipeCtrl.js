angular.module('starter').controller('viewRecipeCtrl', function($scope, $stateParams, recipesService, $state, $ionicScrollDelegate) {
    // Load this recipe
    $ionicScrollDelegate.resize()
    $scope.recipe = recipesService.getRecipeById($stateParams.recipeId);
    window.setTimeout(function() {
        var stuff = $ionicScrollDelegate.getScrollView();
        console.log(stuff);
    }, 1000);
    if(!$scope.recipe || !$scope.recipe.name) {
        $state.go('Recipes');
    }
});