process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {

    var auth = {};

    // before(loginUser(auth));

    function loginUser(auth) {
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

    describe('/GET products', () => {
        it('it should GET the products', (done) => {
            chai.request(server)
                .get('/api/products')
                .set('Accept', "application/json")
                .set('Authorization', 'Bearer ' + auth.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.should.have.property('status');
                    // res.body.should.have.property('message');
                    done();
                });
        });
    });

    // describe('/POST products', () => {
    //     it('it should not create a new user', (done) => {
    //         let user = {
    //             name: "Dev",
    //             email: "djordjepuzic+3@gmail.com",
    //             password: "password"
    //         }
    //         chai.request(server)
    //             .post('/api/users')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('errors');
    //                 res.body.errors.should.have.property('pages');
    //                 res.body.errors.pages.should.have.property('kind').eql('required');
    //                 done();
    //             });
    //     });
    // });

});