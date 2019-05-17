const Router = require('koa2-router');
const router = new Router();
const api = new Router();

const customer = require('./cusromer');
const product = require('./product');
const user = require('./user');

router.use('/api', api);
api.use('/customers', customer);
api.use('/products', product);
api.use('/users', user);

module.exports = router;