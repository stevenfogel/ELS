namespace app {
  export class AdminEvaluateController {
    public isEditing = false;
    public updateOrder: IOrder;
    public order: IOrder;

    public startEditing() {
      this.isEditing = true;
      this.updateOrder = angular.copy(this.order);
    }

    public update() {
      this.OrderService.update(this.updateOrder).then(() => {
      this.isEditing = false;
      this.order = angular.copy(this.updateOrder);
      })
    }

    public remove() {
      this.OrderService.remove(this.order._id).then(() => {
      this.$state.go('admin main')
      })
    }

    constructor(
      private OrderService: app.OrderService,
      private $state: ng.ui.IStateService,
      private $stateParams: ng.ui.IStateParamsService
    ) {
      this.OrderService.getOne( $stateParams['id'] ).then((res) => {
        this.order = res;
      }, () => {
        this.$state.go('admin main')
      })
    }
  }
  angular.module('app').controller('AdminEvaluateController', AdminEvaluateController);
}
