namespace app {
  angular.module('app').config((
    $stateProvider: ng.ui.IStateProvider
  ) => {
    $stateProvider.state('login', {
      url: '/',
      templateUrl: '/client/app/users/login/user.login.jade',
      controller: 'UserLoginController as vm'
    })
    .state('user main', {
      url: '/mainpage',
      templateUrl: '/client/app/users/main/user.main.jade',
      controller: 'UserMainController as vm'
    })
    .state('user register', {
      url: '/register',
      templateUrl: '/client/app/users/register/user.register.jade',
      controller: 'UserRegisterController as vm'
    })
  });
}
