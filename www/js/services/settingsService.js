angular.module('starter').service('settingsService', function() {
    var settingsKey = 'kitchenFriendSettings';


    this.getSettings = function() {
        var data = JSON.parse(localStorage.getItem(settingsKey));
        if(!data) {
            data = {
                lastUser: {}
            };
            return data;
        } else {
            return data;
        }
    };
    
    this.saveSettings = function(newSettings) {
        if(newSettings.lastUser && newSettings.lastUser.password) {
            delete newSettings.lastUser.password;
        }
        var data = JSON.stringify(newSettings);
        localStorage.setItem(settingsKey, data);
    };
});