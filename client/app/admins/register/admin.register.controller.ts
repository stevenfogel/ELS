namespace app {
  export class AdminRegisterController{
    public user: IUser;

    public register() {
      this.AdminService.register(this.user).then((res) => {
        this.$state.go('admin main')
      }, (err) => {
        alert(err);
      })
    }
    constructor(
      private AdminService: app.AdminService,
      private $state: ng.ui.IStateService
    ) {

    }
  }
  angular.module('app').controller('AdminRegisterController', AdminRegisterController);
}
