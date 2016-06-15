namespace app {
  angular.module('app', ['ui.router', 'ngResource'])
  .config((
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider
  ) => {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('authInterceptor');
  });
}
