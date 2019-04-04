const Router = require('koa2-router');
const router = new Router();
const API = new Router();
const customers = require('./cusromers');

router.use('/api', API);
API.use('/customers', customers);

module.exports = router;