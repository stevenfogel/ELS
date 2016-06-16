namespace app {
  export class AdminDeleteUserController {
    public user: IUser;

    public removeUser() {
      this.UserService.removeUser(this.$stateParams['id']).then(() => {
      this.$state.go('admin main')
      })
    }
    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService,
      private $stateParams: ng.ui.IStateParamsService
    ) {

    }
  }
  angular.module('app').controller('AdminDeleteUserController', AdminDeleteUserController);
}
