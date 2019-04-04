const Router = require('koa2-router');
const router = new Router();
const customerController = require('../controller/customers');

router.post('/', customerController.post);

router.get('/:customerId', customerController.get);

router.put('/:customerId', customerController.put);

router.delete('/:customerId', customerController.delete);

module.exports = router;