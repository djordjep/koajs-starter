const Router = require('koa2-router');
const router = new Router();
const productDomain = require('../domain/product');
const paramValidation = require('./param_validation');

router.param('productId', async (ctx, next, param, key) => {
    paramValidation.validateNum(ctx, param, key);
    await next();
});

router.post('/', productDomain.post);

router.get('/', productDomain.get);

router.get('/:productId', productDomain.getBy);

router.put('/:productId', productDomain.put);

router.delete('/:productId', productDomain.delete);

module.exports = router;