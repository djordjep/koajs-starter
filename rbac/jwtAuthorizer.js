const BasicAuthorizer = require('../node_modules/koa-authz/BasicAuthorizer');
const passport = require('koa-passport')

class jwtAuthorizer extends BasicAuthorizer {
    // override function get role
    getUserName() {
        var role, userId;
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (!user || user === 'undefined'){
                role = 'Anonymous';
                userId = null;
            }else{
                role = user.role;
                userId = user.userId;
            }
        })(this.ctx);

        // put the role and userId in the context so
        // we can do some role based response strategies
        // see domain/user get method
        this.ctx.state.user = {};
        this.ctx.state.user.id = userId;
        this.ctx.state.user.role = role;

        return role;
    }

    // this is unchanged method except console.log for debugging
    checkPermission() {
        const { ctx, enforcer } = this;
        const { originalUrl: path, method } = ctx;
        const user = this.getUserName();
        console.log({user, path, method});
        return enforcer.enforce(user, path, method);
    }
}

module.exports = jwtAuthorizer;