import * as express from 'express';
import {IOrderModel, Order} from './order.model';
import { User, IUserModel } from '../users/user.model';

export function getAll(req: express.Request, res: express.Response, next) {
  let query = { creator: req['payload']._id };
  Order.find(query).select('').exec((err, orders) => {
    if(err) return next(err);
    res.json(orders);
  })
}

export function createOrder(req: express.Request, res: express.Response, next) {
  let o = new Order(req.body);
  o.status = 'Pending';
  o.creator = req['payload']._id;
  o.save((err, o) => {
    if(err) return next(err);
    req['order'] = o;
    next();
  });
}


export function adoptUser(req: express.Request, res: express.Response, next: Function) {
  User.update({ _id: req['payload']._id }, { $push: { containers: req['order']._id } }, (err, result: any) => {
    if(err) return next(err);
    if(result.nModified === 0) return next({status: 404, message: "Could not find the requested order."});
    if(result.nModified > 1) return next({status: 500, message: "whoops"});
    res.json(req['order']);
  })
}

export function getOne(req: express.Request, res: express.Response, next) {
  Order.findOne({_id: req.params.id}, req.params.body, {new: true}, (err, p) => {
    if(err) return next(err);
    if(!p) return res.sendStatus(404);
    res.json(p);
  })
}

export function update(req: express.Request, res: express.Response, next) {
  Order.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, p) => {
    if(err) return next(err);
    if(!p) return res.sendStatus(404);
    res.json(p);
  })
}

export function remove(req: express.Request, res: express.Response, next) {
  Order.findOneAndRemove({_id: req.params.id}, (err, p) => {
    if(err) return next(err);
    if(!p) return res.sendStatus(404);
    res.json(p);
  })
}
