namespace app {
  export class AdminMainController {
    public users: IUser[];
    public orders: IOrder[];
    public user: IUser;
    public isRemoving = false;
    public updateUser: IUser;

    public startRemoveUser() {
      this.isRemoving = true;
      this.updateUser = angular.copy(this.user);
    }

    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {
      UserService.getAllUsers().then((res) => {
        this.users = <IUser[]>res;
      })
    }
  }
  angular.module('app').controller('AdminMainController', AdminMainController);
}
