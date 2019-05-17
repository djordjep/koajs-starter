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

// make roles table and users roles pivot table, store role in users roles, get role on auth and put it in JWT, rbac would be on the routes and
// role based entity filterring should be on some methods like get users for "user" role should return self,
// for "admin" should return all users collection