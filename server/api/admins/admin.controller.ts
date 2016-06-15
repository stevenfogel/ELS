import * as express from 'express';
import { User, IUserModel } from '../users/user.model';
import { Order, IOrderModel } from '../orders/order.model';

export function register(req: express.Request, res: express.Response, next: Function) {
  let u = new User(req.body);
  u.isAdmin = true;
  u.hashPassword(req.body.password, (err) => {
    if (err) return next(err);
    u.save((err, data: IUserModel) => {
      if (err) return next(err);
      res.json({ token: data.createJWT() });
    });
  });
}

export function getAllUsers(req: express.Request, res: express.Response, next: Function) {
  User.find({isAdmin: false}).select('-salt -password').populate('containers').exec((err, data) => {
    if(err) return next(err);
    res.json(data);
  })
}

export function checkAdmin(req: express.Request, res: express.Response, next: Function) {
  if(req['payload'].isAdmin) {
    next();
  } else {
    res.redirect('/');
  }
}
