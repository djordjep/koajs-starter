const Router = require('koa2-router');
const router = new Router();
const customerDomain = require('../domain/customers');
const paramValidation = require('./param_validation');
const passport = require('koa-passport');

// router param validation
router.param('customerId', async (ctx, next, param, key) => {
    paramValidation.validateNum(ctx, param, key);
    await next();
})

router.post('/', customerDomain.register);
router.post('/login', customerDomain.signIn);
router.post('/facebook', customerDomain.facebookSignin);

router.get('/', customerDomain.get);

router.put('/', passport.authenticate('jwt', { session: false }), customerDomain.updateCustomer);
router.put('/address', customerDomain.updateAdress);
router.put('/creditCard', customerDomain.updateCreditCard);

module.exports = router;