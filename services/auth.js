const passport = require('koa-passport')
const bcrypt = require('bcrypt')
const Customer = require('../domain/model_bootstrap')['models']['Customer'];
const sequelize = require('../domain/model_bootstrap')['sequelize'];

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/**
 * Localstrategy of Passport.js 
 * 
 * @param string        Username
 * @param string        password
 * @returns
 */
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
        try {
            var customerarr = await sequelize
                .query('CALL customer_get_login_info (:email)',
                    { replacements: { email: username }, type: sequelize.QueryTypes.RAW });
        } catch (error) {
            console.error(error);
        }

        const customer = JSON.parse(JSON.stringify(customerarr[0]));

        if (customer) {
            bcrypt.compare(password, customer.password, async (error, response) => {
                if (response) {
                    // if loggin passes we will put customer model in jwt
                    const customerModel = await Customer.findOne({
                        where: {
                            customer_id: customer.customer_id
                        }
                    });
                    done(null, customerModel)
                } else {
                    done(null, false)
                }
            });
        } else {
            done(null, false)
        }
    }
));

/**
 * Facebook strategy of Passport.js 
 * 
 * @param
 * @returns
 */
const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: 'facebook-app-id',
    clientSecret: 'facebook-app-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/customers/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'photos', 'email']
},
    async (token, tokenSecret, profile, done) => {
        // Retrieve customer from database, if exists
        const customer = await Customer.findOne({
            where: {
                email: profile.emails[0].value
            }
        })
        if (customer) {
            done(null, customer)
        } else {
            // If customer not exist, create it
            const newCustomer = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                password: 'password-is-from-fb',
                email: profile.emails[0].value
            }
            const createdCustomer = await Customer.create(newCustomer)
            if (createdCustomer) {
                done(null, createdCustomer)
            } else {
                done(null, false)
            }
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: '7ea8fe0b900a2ffe301b5c0a1408d00e'
},
    function (jwtPayload, cb) {
        return cb(null, jwtPayload);

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    }
));
