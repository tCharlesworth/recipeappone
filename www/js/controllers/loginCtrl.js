angular.module('starter').controller('loginCtrl', function ($state, settingsService, recipesService, $ionicModal, $scope, requestService) {
    $scope.load = {};
    var settings = settingsService.getSettings();
    if(settings && settings.lastUser && settings.lastUser.id) {
        $scope.showRegister = false;
    } else {
        $scope.showRegister = true;
    }
    $scope.loadData = function() {
        console.log('Loading: ', $scope.load);
        requestService.tryLocalLogin($scope.load).then(function(result) {
            console.log('Login Successful: ', result);
            //Local Login Success
            $scope.loginModal.hide();
            //Save this users information
            var settings = settingsService.getSettings();
            settings.lastUser = $scope.load;
            settings.lastUser.id = result._id;
            settingsService.saveSettings(settings);
            //Done
            $state.go('Home');
        }).catch(function(err) {
            console.log('login failed', err);
            if(err.data.message === 'User Not Found') {
                $scope.loginError = 'User not found';
            } else {
                $scope.loginError = 'Invalid Password';
            }
        });
    };
    
    $scope.register = function(registerInfo) {
        console.log('Registering: ', registerInfo);
        $scope.registerError = "Processing...";
        if(registerInfo.password !== registerInfo.confirm) {
            $scope.registerError = 'Passwords do not match';
            return;
        }
        requestService.registerNewUser(registerInfo).then(function(response) {
            console.log('register success', response);
            var settings = {
                lastUser: {
                    email: response.data.contactEmail,
                    id: response.data._id
                }
            };
            settingsService.saveSettings(settings);
            recipesService.saveRecipes([]);
            $scope.registerModal.hide();
            $state.go('Home');
        }).catch(function(err) {
            console.error('register error', err);
            $scope.registerError = err.data;
            if(err.data.code === 11000) {
                $scope.registerError = 'Email already in use.';
            }
        });
    }
    
    // Login Modal
    $ionicModal.fromTemplateUrl('templates/loginModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginModal = modal;
    });
    
    $scope.openLoginModal = function() {
        $scope.loginModal.show();
    };
    
    $scope.hideLoginModal = function() {
        $scope.loginModal.hide();
    };
    // Register Modal
    $ionicModal.fromTemplateUrl('templates/registerModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.registerModal = modal;
    });
    
    $scope.openRegisterModal = function() {
        $scope.registerModal.show();
    };
    
    $scope.hideRegisterModal = function() {
        $scope.registerModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.loginModal.remove();
    });
});
