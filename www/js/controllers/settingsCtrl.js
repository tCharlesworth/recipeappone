angular.module('starter').controller('settingsCtrl', function($scope, settingsService, $ionicModal, requestService, $state) {
    // What Settings?
    $scope.settings = settingsService.getSettings();
    
    $scope.saveSettings = function(settings) {
        settingsService.saveSettings(settings);
        $state.go('Home');
    };
    
    $scope.cancelSettings = function() {
        $state.go('Home');
    };
    
    $scope.load = {};
});