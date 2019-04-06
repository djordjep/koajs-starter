const Router = require('koa2-router');
const router = new Router();
const customerDomain = require('../domain/customers');
const paramValidation = require('./param_validation');

// router param validation
router.param('customerId', async (ctx, next, param, key) => {
    paramValidation.validateNum(ctx, param, key);
    await next();
})

router.post('/', customerDomain.post);

router.get('/', customerDomain.get);
;
router.get('/:customerId', customerDomain.getBy);

router.put('/:customerId', customerDomain.put);

router.delete('/:customerId', customerDomain.delete);

module.exports = router;