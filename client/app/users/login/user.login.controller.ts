namespace app {
  export class UserLoginController {
    public user: IUser;

    public login() {
      this.UserService.login(this.user).then((res) => {
        if(res['isAdmin']){
          this.$state.go('admin main')
        } else {this.$state.go('user main'); }
      }, (err) => {
        alert(err);
      });
    }

    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {


    }
  }
  angular.module('app').controller('UserLoginController', UserLoginController);
}
