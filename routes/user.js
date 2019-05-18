const Router = require('koa2-router');
const router = new Router();
const userDomain = require('../domain/user');
const paramValidation = require('./param_validation');
const passport = require('koa-passport');

// router param validation
router.param('userId', async (ctx, next, param, key) => {
    paramValidation.validateNum(ctx, param, key);
    await next();
});

router.post('/', userDomain.register);
router.post('/login', userDomain.signIn);
router.post('/facebook', userDomain.facebookSignin);

router.get('/', userDomain.get);

router.put('/', passport.authenticate('jwt', { session: false }), userDomain.updateCustomer);

module.exports = router;
