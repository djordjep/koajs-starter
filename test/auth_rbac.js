process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Rbac', () => {

    var auth = {};

    function loginUser(auth) {
        return function (done) {
            let user = {
                email: "djordjepuzic+1@gmail.com",
                password: "password"
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end(onResponse);

            function onResponse(err, res) {
                auth.token = res.body.token;
                return done();
            }
        };
    };

    before(loginUser(auth));

    describe('/GET users without credentials', () => {
        it('it should reject with Forbidden', (done) => {
            chai.request(server)
                .get('/api/users')
                .set('Accept', "application/json")
                // .set('Authorization', 'Bearer ' + auth.token)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });

    describe('/GET users as user', () => {
        it('it should GET the user object', (done) => {
            chai.request(server)
                .get('/api/users')
                .set('Accept', "application/json")
                .set('Authorization', 'Bearer ' + auth.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('userId');
                    res.body.should.have.property('role');
                    done();
                });
        });
    });

    describe('/POST product as Anonymous', () => {
        it('it should reject as unauthorized', (done) => {
            chai.request(server)
                .post('/api/products')
                .set('Accept', "application/json")
                .set('Authorization', 'Bearer ')
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });

});