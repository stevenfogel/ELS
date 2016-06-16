import * as express from 'express';
import * as jwt from "express-jwt";
import * as controller from './admin.controller';

const router = express.Router();
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload"
});

router.get('/admin/mainpage', auth, controller.checkAdmin, controller.getAllUsers);
router.post('/register', auth, controller.checkAdmin, controller.register);

export = router;
