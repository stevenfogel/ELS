namespace app {
  angular.module('app').directive('navbar', () => {
      return {
        templateUrl: '/client/components/navbar/navbar.jade',
        controller: 'NavbarController as nav'
      }
  });
}
