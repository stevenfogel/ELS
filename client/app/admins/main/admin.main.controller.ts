namespace app {
  export class AdminMainController {
    public users: IUser[];
    public orders: IOrder[];

    constructor(
      private UserService: app.UserService
    ) {
      UserService.getAllUsers().then((res) => {
        this.users = <IUser[]>res;
      })
    }
  }
  angular.module('app').controller('AdminMainController', AdminMainController);
}
