namespace app {
  export class UserMainController {
    public orders: IOrder[];

    constructor(
      private OrderService: app.OrderService
    ) {
      this.orders = OrderService.getAll();
    }
  }
  angular.module('app').controller('UserMainController', UserMainController);
}
