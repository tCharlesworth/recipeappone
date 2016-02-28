angular.module('starter').service('requestService', function ($http, $state, settingsService, recipesService) {
   
       var server = 'http://kitchenFriend.tcharlesworth.com';
    // var server = 'http://localhost:3000';

    this.tryLocalLogin = function (authData) {
        //Need to hit server here
        return $http({
            method: 'POST',
            url: server + '/mobile/login',
            data: authData
        }).then(function (response) {
            //Save Recipes
            recipesService.saveRecipes(response.data.recipes);
            return response.data;
        });
    };

    this.getRecipes = function () {
        var settings = settingsService.getSettings();
        console.log('Service found id: ', settings.lastUser.id);
        return $http({
            method: 'GET',
            url: server + '/mobile/recipes/' + settings.lastUser.id
        }).then(function (response) {
            console.log('Got Response From Server: ', response);
            recipesService.saveRecipes(response.data.recipes);
        });
    };

    this.saveRecipe = function (newRecipe) {
        var settings = settingsService.getSettings();
        // Do we have a user?
        if (settings.lastUser.id) {
            // Do we have internet?
            if (settings.hasInternet && settings.lastUser.id) {
                // Cool. Make web request
                $http({
                    method: 'POST',
                    url: server + '/mobile/recipes/' + settings.lastUser.id,
                    data: newRecipe
                }).then(function (result) {
                    postSave(result.data, true);
                }).catch(function (err) {
                    console.error('Error saving: ', err);
                    postSave(newRecipe, false);
                });
            } else {
                postSave(newRecipe, false);
            }
        } else {
            // Need to login first
            $state.go('Login');
        }
    };

    var postSave = function (recipe, success) {
        if(!success) {
            console.warn('Request to internet failed');
            var settings = settingsService.getSettings();
            var action = {action: 'POST RECIPE', data: recipe};
            if(settings.nextInternet) {
                settings.nextInternet.push(action);
            } else {
                settings.nextInternet = [action];
            }
            settingsService.saveSettings(settings);
        }
        // Add to my local recipes
        recipesService.saveNewRecipe(recipe);
        $state.go('Home');
    };
    
    this.removeRecipe = function(recipeId) {
        var settings = settingsService.getSettings();
        // Do we have a user?
        if (settings.lastUser.id) {
            // Do we have internet?
            if (settings.hasInternet && settings.lastUser.id) {
                // Cool. Make web request
                $http({
                    method: 'DELETE',
                    url: server + '/mobile/recipes/' + settings.lastUser.id+'?recipeId='+recipeId
                }).then(function (result) {
                    postRemove(recipeId, true);
                }).catch(function (err) {
                    console.error('Error saving: ', err);
                    postRemove(recipeId, false);
                });
            } else {
                postRemove(recipeId, false);
            }
        } else {
            // Need to login first
            $state.go('Login');
        }
    };
    
    var postRemove = function(recipeId, success) {
        if(!success) {
            console.warn('Request to internet failed');
            var settings = settingsService.getSettings();
            var action = {action: 'DELETE RECIPE', data: recipeId};
            if(settings.nextInternet) {
                settings.nextInternet.push(action);
            } else {
                settings.nextInternet = [action];
            }
            settingsService.saveSettings(settings);
        }
        // Add to my local recipes
        recipesService.removeRecipe(recipeId);
    };
    
    this.registerNewUser = function(newInfo) {
        return $http({
            method: 'POST',
            url: server+'/mobile/auth/register',
            data: newInfo
        });
    };
});