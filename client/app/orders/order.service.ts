namespace app {
  interface IOrderResourceClass extends ng.resource.IResource<IOrderResourceClass>, IOrder{}
  interface IOrderResource extends ng.resource.IResourceClass<IOrderResourceClass>{
    update(params:Object);
    update(params:Object, body:Object);
  }

  export class OrderService {
    private OrderResource: IOrderResource;

    public createOrder(order:IOrder) {
      return this.OrderResource.save(order).$promise.then((res) => {
        this.$state.go('user main')
      }, (err) => {
        alert(err);
      })
    }

    public getAll() {
      return this.OrderResource.query();
    }

    public getOne(id: number) {
      return this.OrderResource.get({ id: id }).$promise;
    }

    public update(order:IOrder) {
      return this.OrderResource.update({id: order._id}, order).$promise
    }

    public remove(id: number) {
      return this.OrderResource.remove({id: id}).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService,
      private $state: ng.ui.IStateService
    ) {
    this.OrderResource = <IOrderResource>$resource('/api/v1/orders/:id',
    null, {'update': {'method': 'PUT'}});
    }
  }
  angular.module('app').service('OrderService', OrderService);
}
