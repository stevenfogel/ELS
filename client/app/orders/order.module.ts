namespace app {
  angular.module('app').config((
    $stateProvider: ng.ui.IStateProvider
  ) => {
    $stateProvider.state('user create', {
      url: '/create/order',
      templateUrl: '/client/app/orders/createorder/user.createorder.jade',
      controller: 'UserCreateOrderController as vm'
    })
  });
}
