namespace app {
  export class NavbarController{
    public status;

    public logout() {
      this.UserService.logout();
      this.$state.go('login');
    }

    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {
      this.status = UserService.status;
    }
  }
  angular.module('app').controller('NavbarController', NavbarController);
}
