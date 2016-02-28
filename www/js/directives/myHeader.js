angular.module('starter').directive('myHeader', function($state, settingsService) {
    return {
        templateUrl: 'templates/myHeader.html',
        scope: {
            title: '@'
        },
        link: function(scope, ele, attrs) {
            scope.openMenu = function() {
                var settings = settingsService.getSettings();
                if(!settings.lastUser || !settings.lastUser.id) {
                    //do 
                    $state.go('Login');
                } else {
                    $state.go('Home');
                }
            };
        }
    };
})