const Router = require('koa2-router');
const router = new Router();
const userDomain = require('../domain/user');
const paramValidation = require('./param_validation');
const passport = require('koa-passport');

// router param validation
router.param('userId', async (ctx, next, param, key) => {
    paramValidation.validateNum(ctx, param, key);
    await next();
})

router.post('/', userDomain.register);
router.post('/login', userDomain.signIn);
router.post('/facebook', userDomain.facebookSignin);

router.get('/', userDomain.get);

router.put('/', passport.authenticate('jwt', { session: false }), userDomain.updateCustomer);

module.exports = router;

// make roles table and users roles pivot table, store role in users roles, get role on auth and put it in JWT, rbac would be on the routes and
// role based entity filterring should be on some methods like get users for "user" role should return self,
// for "admin" should return all users collection