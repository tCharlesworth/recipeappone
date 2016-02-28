angular.module('starter').controller('recipesCtrl', function ($scope, recipesService, requestService) {

    $scope.recipes = recipesService.getRecipes();

    console.log('Recipes: ', $scope.recipes);
    $scope.selectedIndex = -1;

    $scope.changeSelected = function (idx) {
        console.log('need to select: ', idx);
        if(idx === $scope.selectedIndex) {
            $scope.selectedIndex = -1;
            updateDirFuncs[idx](false);
            return;
        }
        for (var i = 0; i < updateDirFuncs.length; i++) {
            if (i === idx) {
                updateDirFuncs[i](true);
                $scope.selectedIndex = i;
            } else {
                updateDirFuncs[i](false);
            }
        }
    };
    
    $scope.removeRecipe = function(recipeId) {
        if(window.confirm('Are you sure you want to delete this recipe?')) {
            console.log('Removing: ', recipeId);
            requestService.removeRecipe(recipeId);
            for(var i = 0; i < $scope.recipes.length; i++) {
                if($scope.recipes[i]._id === recipeId) {
                    $scope.recipes.splice(i, 1);
                }
            }
        }
    }

    $scope.addFuncToList = function (newFunc) {
        updateDirFuncs.push(newFunc);
    }

    var updateDirFuncs = [];
});