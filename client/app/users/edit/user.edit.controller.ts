namespace app {
  export class UserEditController {
    public isUpdatingUser = false;
    public updateUser: IUser;
    public user: IUser;

    public startUpdating() {
      this.isUpdatingUser = true;
      this.updateUser = angular.copy(this.user);
    }

    public updateUserInfo() {
      this.UserService.updateUser(this.updateUser).then(() => {
      this.isUpdatingUser = false;
      this.user = angular.copy(this.updateUser);
      })
    }
    constructor(
      public UserService: app.UserService,
      public $state: ng.ui.IStateService,
      public $stateParams: ng.ui.IStateParamsService
    ) {
      this.UserService.getOne( $stateParams['id'] ).then((res) => {
        this.user = res;
      }, () => {
        this.$state.go('user main')
      })
    }
  }
  angular.module('app').controller('UserEditController', UserEditController);
}
