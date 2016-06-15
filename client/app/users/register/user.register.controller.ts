namespace app{
  export class UserRegisterController {
    public user: IUser;

    public register() {
      this.UserService.register(this.user).then((res) => {
        this.$state.go('user main')
      }, (err) => {
        alert(err);
      })
    }

    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {

    }
  }
  angular.module('app').controller('UserRegisterController', UserRegisterController);
}
