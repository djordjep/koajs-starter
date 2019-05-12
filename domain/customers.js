const Customer = require('./model_bootstrap')['models']['Customer'];
const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

const customers = {
    register: async ctx => {
        // TODO: update validation on model
        if (!ctx.request.body.email) ctx.throw(400, `Parameter <email> must be provided.`);
        const hashedPass = await bcrypt.hash(ctx.request.body.password, 10);
        ctx.request.body.password = hashedPass;
        let record;
        try {
            record = await Customer.findOrCreate({ where: { email: ctx.request.body.email }, defaults: ctx.request.body });
        } catch (error) {
            // we catch validation errors here so status is 400
            error.status = 400;
            error.expose = true;
            throw error;
        }

        if (!record[1]) ctx.throw(400, `Duplicate entry`);

        ctx.body = record[0];
    },
    signIn: ctx => {
        if (!ctx.request.body.email || !ctx.request.body.password) ctx.throw(400, `Parameters <email> and <password> must be provided.`);

        return passport.authenticate('local', { session: false }, (err, user) => {
            if (user === false) {
                ctx.throw(401, `Wrong credentials`);
            } else {
                const token = jwt.sign(user.get({ plain: true }), '7ea8fe0b900a2ffe301b5c0a1408d00e', { expiresIn: '30m' }); // '2 days'
                ctx.body = { user: user, token: token };
            }
        })(ctx);
    },
    facebookSignin: ctx => {
        ctx.body = `hello customer`
    },
    // Get a customer by Token.
    get: async ctx => {
        return passport.authenticate('jwt', { session: false }, async (err, user) => {
            if (!user) ctx.throw(401, `Wrong credentials`);
            ctx.body = user;
        })(ctx);
    },
    updateCustomer: ctx => ctx.body = ctx,
    updateAdress: ctx => {
        ctx.body = `hello customer`
    },
    updateCreditCard: ctx => {
        ctx.body = `hello customer`
    }
};

module.exports = customers;