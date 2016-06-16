import * as express from 'express';
import { User, IUserModel } from './user.model';

export function login(req: express.Request, res: express.Response, next: Function) {
  User
    .findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next({ status: 401, message: 'Invalid email/password combination.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) return next({ status: 401, message: 'Invalid email/password combination.' });
        res.json({ token: user.createJWT() });
      });
  });
}

export function register(req: express.Request, res: express.Response, next: Function) {
  let u = new User(req.body);
  u.isAdmin = false;
  u.hashPassword(req.body.password, (err) => {
    if (err) return next(err);
    u.save((err, data: IUserModel) => {
      if (err) return next(err);
      res.json({ token: data.createJWT() });
    });
  });
}


export function removeUser(req: express.Request, res: express.Response, next) {
  User.findOneAndRemove({_id: req.params.id}, (err, p) => {
    if(err) return next(err);
    if(!p) return res.sendStatus(404);
    res.json(p);
  })
}

export function updateUser(req: express.Request, res: express.Response, next) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, p) => {
    if(err) return next(err);
    if(!p) return res.sendStatus(404);
    res.json(p);
  })
}

export function getOne(req: express.Request, res: express.Response, next) {
  User.findOne({_id: req.params.id}, req.params.body, {new: true}, (err, p) => {
    if(err) return next(err);
    if(!p) return res.sendStatus(404);
    res.json(p);
  })
}
