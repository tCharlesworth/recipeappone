angular.module('starter').controller('newRecipeCtrl', function($scope, $state, requestService, $ionicScrollDelegate) {
    $scope.newRecipe = {
        name: '',
        description: '',
        picture: '',
        prepTime: 0,
        cookTime: 0,
        ingredients: [],
        directions: []
    };
    
    $scope.hasPicture = false;
    
    $scope.$watch('newRecipe', function() {
        $scope.hasPicture = ($scope.newRecipe.picture.length > 0);
        if($ionicScrollDelegate.refresh)
        $ionicScrollDelegate.refresh();
    });
    
    $scope.saveRecipe = function (newRecipe) {
        requestService.saveRecipe(newRecipe);
    };
    
    $scope.cancelRecipe = function() {
        $state.go('Home');
    };
});