namespace app {
  angular.module('app').config((
    $stateProvider: ng.ui.IStateProvider
  ) => {
    $stateProvider.state('admin main', {
      url: '/admin/mainpage',
      templateUrl: '/client/app/admins/main/admin.main.jade',
      controller: 'AdminMainController as vm'
    })
    .state('admin register', {
      url: '/admin/register',
      templateUrl: '/client/app/admins/register/admin.register.jade',
      controller: 'AdminRegisterController as vm'
    })
    .state('admin evaluate', {
      url: '/admin/evaluate/:id',
      templateUrl: '/client/app/admins/evaluate/admin.evaluate.jade',
      controller: 'AdminEvaluateController as vm'
    })
    .state('admin delete user', {
      url: '/admin/delete/user/:id',
      templateUrl: '/client/app/admins/deleteuser/admin.deleteuser.jade',
      controller: 'AdminDeleteUserController as vm'
    })
  });
}
