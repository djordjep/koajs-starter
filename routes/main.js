const Router = require('koa2-router');
const router = new Router();
const api = new Router();

const customer = require('./cusromer');
const product = require('./product');

router.use('/api', api);
api.use('/customers', customer);
api.use('/product', product);

module.exports = router;