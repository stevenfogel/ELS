namespace app {
  export class UserCreateOrderController {
    public order: IOrder;
    public createOrder() {
      this.OrderService.createOrder(this.order).then(() => {
      this.$state.go('user main');
    }, (err) => {
      alert(err);
    })
    }
    constructor(
      private OrderService: app.OrderService,
      private $state: ng.ui.IStateService
    ) {

    }
  }
  angular.module('app').controller('UserCreateOrderController', UserCreateOrderController);
}
