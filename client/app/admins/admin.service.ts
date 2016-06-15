namespace app {
  export class AdminService {
    public status = {
      _id: '',
      email: ''
    }

    public login(u: IUser) {
      let q = this.$q.defer();
      this.$http.post('/api/v1/admins/login', u).then((res) => {
        this.setToken(res.data['token']);
        this.setAdmin();
        q.resolve();
      }, (err) => {
        q.reject(err);
      });
      return q.promise;
    }

    public register(u: IUser) {
      let q = this.$q.defer();
      this.$http.post('/api/v1/admins/register', u).then((res) => {
        this.setToken(res.data['token']);
        this.setAdmin();
        q.resolve(res.data);
      }, (err) => {
        q.reject(err);
      });
      return q.promise;
    }

    public logout() {
      this.$window.localStorage.removeItem('token');
      this.status._id = '';
      this.status.email = '';
    }

    public setAdmin() {
      let u = JSON.parse( this.urlBase64Decode( this.$window.localStorage.getItem('token').split('.')[1] ) );
      this.status._id = u._id;
      this.status.email = u.email;
    }
    public getToken() {
      return this.$window.localStorage.getItem('token');
    }
    public setToken(token: string) {
      this.$window.localStorage.setItem('token', token)
    }

    private urlBase64Decode(str) {
      let output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: { break; }
        case 2: { output += '=='; break; }
        case 3: { output += '='; break; }
        default: {
          throw 'Illegal base64url string!';
        }
      }
      return decodeURIComponent(encodeURIComponent(this.$window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }

    constructor(
      private $http: ng.IHttpService,
      private $q: ng.IQService,
      private $window: ng.IWindowService
    ) {
      if (this.getToken()) this.setAdmin();
    }
  }
  angular.module('app').service('AdminService', AdminService);
}
