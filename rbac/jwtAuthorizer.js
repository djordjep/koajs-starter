const BasicAuthorizer = require('../node_modules/koa-authz/BasicAuthorizer');
const passport = require('koa-passport')

class jwtAuthorizer extends BasicAuthorizer {
    // override function get role
    getUserName() {
        var role;
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (!user || user === 'undefined'){
                role = 'Anonymous';
            }else{
                role = user.role;
            }
        })(this.ctx);

        console.log(role);

        return role;
    }
}

module.exports = jwtAuthorizer;