angular.module('starter').service('recipesService', function(settingsService, $http) {
    var recipes = [];
    var recipesKey = 'kitchenFriendRecipes';
    
    this.getRecipes = function() {
        if(recipes.length === 0) {
            recipes = loadRecipes();
        }
        return recipes;
    };
    
    this.getRecipeById = function(recipeId) {
        for(var i = 0; i < recipes.length; i++) {
            if(recipes[i]._id == recipeId) {
                return recipes[i];
            }
        }
    };
    
    this.saveRecipes = function(recipes) {
        console.log('saveing', recipes);
        var data = JSON.stringify(recipes);
        localStorage.setItem(recipesKey, data);
    };
    
    this.saveNewRecipe = function(newRecipe) {
        if(recipes.length === 0) {
            recipes = loadRecipes();
        }
        recipes.push(newRecipe);
        var data = JSON.stringify(recipes);
        localStorage.setItem(recipesKey, data);
    };
    
    this.removeRecipe = function(recipeId) {
        recipes = loadRecipes();
        console.log('Delete Removing: ', recipeId);
        for(var i = 0; i < recipes.length; i++) {
            if(recipes[i]._id.toString() == recipeId.toString()) {
                recipes.splice(i, 1);
                i = recipes.length;
                console.log('Match Removed');
            }
        }
        console.log('saving after remove');
        var data = JSON.stringify(recipes);
        localStorage.setItem(recipesKey, data);
    }
    
    var loadRecipes = function() {
        var data = localStorage.getItem(recipesKey);
        return JSON.parse(data);
    };

});