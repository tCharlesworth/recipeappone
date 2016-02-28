// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, settingsService, requestService, $state) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    var hasInternet;
    var settings = settingsService.getSettings();
    // Check Internet
    if (window.Connection) {
        settings.hasInternet = (navigator.connection.type == Connection.NONE);
        settingsService.saveSettings(settings);
        console.warn('INTERNET: ', hasInternet);
    } else {
        console.warn('No Connection Information');
        settings.hasInternet  = true;
        hasInternet = settings.hasInternet;
        settingsService.saveSettings(settings);
    }
    
    if(settings) {
        if(settings.lastUser) {
            if(!settings.lastUser.id) {
                //Must go to login
                $state.go('Login');
            }
        }
        if(hasInternet) {
            //Are there any pending actions?
            var actions = settings.nextInternet;
            if(actions) {
                console.warn('Working on '+actions.length+' actions.');
                for(var i = 0; i < actions.length; i++) {
                    switch(actions[0].action) {
                        case 'POST RECIPE':
                            requestService.saveRecipe(actions[0].data);
                            break;
                        case 'DELETE RECIPE':
                            requestService.removeRecipe(actions[0].data);
                            break;
                        default:
                            console.log('action not recognized: ', actions[0].action);
                            break;
                    }
                    actions.splice(0, 1);
                }
                settings.nextInternet = actions;
                settingsService.saveSettings(settings);
            } else {
                console.log('No actions found');
            }
            // Do they want to auto-update?
            if(settings.autoUpdate) {
                console.log('Running auto-update');
                requestService.getRecipes();
            }
        }
    } else {
        $state.go('Login');
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('Home', {
            url: '/home',
            templateUrl: 'views/home.html',
        })
        .state('Recipes', {
            url: '/recipes',
            templateUrl: './views/recipes.html',
            controller: 'recipesCtrl'
        })
        .state('ViewRecipe', {
            url: '/recipe/:recipeId',
            templateUrl: './views/viewRecipe.html',
            controller: 'viewRecipeCtrl'
        })
        .state('Settings', {
            url: '/settings',
            templateUrl: './views/settings.html',
            controller: 'settingsCtrl'
        })
        .state('NewRecipe', {
            url: '/newRecipe',
            templateUrl: './views/newRecipe.html',
            controller: 'newRecipeCtrl'
        })
        .state('Login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        });
    
    $urlRouterProvider.otherwise('/home');
});