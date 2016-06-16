import * as express from 'express';
import * as jwt from "express-jwt";
import * as controller from './order.controller';
const router = express.Router();
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload"
});

router.get('/', auth, controller.getAll);
router.post('/', auth, controller.createOrder, controller.adoptUser);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export = router;
