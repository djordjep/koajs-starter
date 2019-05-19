const Router = require('koa2-router');
const router = new Router();
const api = new Router();

const v1 = new Router();

const customer = require('./cusromer');
const product = require('./product');
const user = require('./user');

router.use('/api', api);
api.use('/v1',v1);

// base routes
api.use('/customers', customer);
api.use('/products', product);
api.use('/users', user);

// v1 routes
v1.use('/customers', customer);
v1.use('/products', product);
v1.use('/users', user);

module.exports = router;