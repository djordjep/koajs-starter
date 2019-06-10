process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Route strategy User', () => {

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
});

describe('Route strategy Admin', () => {

    var auth = {};

    function loginAdmin(auth) {
        return function (done) {
            let user = {
                email: "djordjepuzic@gmail.com",
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

    before(loginAdmin(auth));

    describe('/GET users as admin', () => {
        it('it should GET the users collection', (done) => {
            chai.request(server)
                .get('/api/users')
                .set('Accept', "application/json")
                .set('Authorization', 'Bearer ' + auth.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});