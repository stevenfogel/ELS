// Imports
import * as mongoose from "mongoose";
import * as express from "express";
import * as Order from './api/orders/order.model'
import config = require('./config/config');

//Global Vars
const MONGO_URL = "mongodb://localhost/container-manager";
let app = express();

//Mongoose Connection
require('./api/orders/order.model');
require('./api/users/user.model');
mongoose.connect(MONGO_URL, function(err){
  if(err) console.log(err)
  else console.log(`connected to ${MONGO_URL}`)})

  app.get(/\/client.{0,}\/.+\.jade/, (req, res, next) => {
    res.render(config.root + req.path);
  })

  //Routes config
  app.use(require('body-parser')());
  // access bower_components via /scripts/...
app.use('/bower_components', express.static('bower_components'));
// access the client->app->home folder via /app/home
app.use('/client', express.static('client'));

// Routes
app.get('/', (req, res, next) => {
  res.sendFile(config.client + '/index.html');
});
app.use('/api/v1/orders', require('./api/orders/order.routes'));
app.use('/api/v1/users', require('./api/users/user.routes'));
app.use('/api/v1/admins', require('./api/admins/admin.routes'));

// if path start with /client, /bower_components, or /api, send a 404
app.get(/\/(client|bower_components|api).{0,}/, (req, res, next) => {
  next({ status: 404, message: `${req.path} is not found or does not exist. Please check for typos.` });
});

// all other get calls, ex: /adopt, send the index.html and let angular take care of the routing
app.get('/*', (req, res, next) => {
  res.sendFile(config.client + '/index.html');
});

app.use((req, res, next) => {
  return next({ status: 404 , message: `${req.method}: ${req.path} is not found.` });
});

app.use((err: any, req, res, next) => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production')
    console.log(err);
  if (process.env.NODE_ENV === 'production')
    err = { status: err.status || 500, message: err.message || '' };
  res.status(err.status).send(err);
})

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err: any, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err);
})

// Listen
app.listen(3000, () => {
  console.log('Server is listening on localhost:3000');
});
