const User = require('./model_bootstrap')['models']['User'];
const UsersRoles = require('./model_bootstrap')['models']['UsersRoles'];
const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

const getSelf = async ctx => {
    return passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (!user) ctx.throw(401, `Wrong credentials`);
        ctx.body = user;
    })(ctx);
};

const getAll = async ctx => {
    try {
        var record = await User.findAll();
    } catch (error) {
        // we catch validation errors here so status is 400
        error.status = 400;
        error.expose = true;
        throw error;
    }
    ctx.body = record;
};

const user = {
    register: async ctx => {
        // TODO: update validation on models,see user model
        if (!ctx.request.body.email) ctx.throw(400, `Parameter <email> must be provided.`);
        const hashedPass = await bcrypt.hash(ctx.request.body.password, 10);
        ctx.request.body.password = hashedPass;
        var record;
        try {
            record = await User.findOrCreate({ where: { email: ctx.request.body.email }, defaults: ctx.request.body });
        } catch (error) {
            // we catch validation errors here so status is 400
            error.status = 400;
            error.expose = true;
            throw error;
        }

        if (!record[1]) ctx.throw(400, `Duplicate entry`);

        // # role_id, name
        // '1', 'SuperAdmin'
        // '2', 'Admin'
        // '3', 'ElevatedUser'
        // '4', 'User'
        // '5', 'Anonimus'
        try {
            await UsersRoles.create({ userId: record[0].get('userId'), roleId: 4});
        } catch (error) {
            throw error;
        }

        ctx.body = record[0];
    },
    signIn: ctx => {
        if (!ctx.request.body.email || !ctx.request.body.password) ctx.throw(400, `Parameters <email> and <password> must be provided.`);

        return passport.authenticate('local', { session: false }, (err, user) => {
            if(err) throw err;

            if (user === false) {
                ctx.throw(401, `Wrong credentials`);
            } else {
                const token = jwt.sign(user, '7ea8fe0b900a2ffe301b5c0a1408d00e', { expiresIn: '3h' }); // '2 days'
                ctx.body = { 
                    user: user,
                    token: token
                };
            }
        })(ctx);
    },
    facebookSignin: ctx => {
        ctx.body = `hello customer`
    },
    get: async ctx => {
        if (ctx.state.user.role === 'User') return getSelf(ctx);
        if (ctx.state.user.role === 'Admin' || 'SuperAdmin') return getAll(ctx);
        console.log("Tralalalalalalalalalal");
        const { originalUrl: path, method } = ctx;
        ctx.throw(409, `No response strategy for role: ${ctx.state.user.role}, on endpoint: ${path}, method: ${method}`);
    },
    updateCustomer: ctx => ctx.body = ctx,
};

module.exports = user;