process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

 describe('Users', () => {
     var auth = {};
    //  before(loginUser(auth));

    //  function loginUser(auth) {
    //      return function (done) {
    //          let user = {
    //              email: "djordjepuzic@gmail.com",
    //              password: "password"
    //          }
    //          chai.request(server)
    //              .post('/auth/local')
    //              .send(user)
    //              .end(onResponse);

    //          function onResponse(err, res) {
    //              auth.token = res.body.token;
    //              return done();
    //          }
    //      };
    //     };

    /*
      * Test the /GET route
      */
    

    // describe('/POST user', () => {
    //     it('it should create a new user', (done) => {
    //         let user = {
    //             name: "Dev",
    //             email: "djordjepuzic+1@gmail.com",
    //             password: "password"
    //         }
    //         chai.request(server)
    //             .post('/api/users')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('user');
    //                 res.body.should.have.property('token');
    //                 done();
    //             });
    //     });
    // });

    describe('/POST user login as admin', () => {
        it('it should login the user', (done) => {
            let user = {
                email: "djordjepuzic@gmail.com",
                password: "password"
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');
                    auth.token = res.body.token;
                    done();
                });
        });
    });

     describe('/GET user', () => {
         it('it should GET the user by auth token', (done) => {
             chai.request(server)
                 .get('/api/users')
                 .set('Authorization', 'Bearer ' + auth.token)
                 //.set('Accept', 'application/json')
                 .end((err, res) => {
                     res.body.should.be.a('array');
                     done();
                 });
         });
     });

     describe('/POST user login as user', () => {
         it('it should login the user', (done) => {
             let user = {
                 email: "djordjepuzic+1@gmail.com",
                 password: "password"
             }
             chai.request(server)
                 .post('/api/users/login')
                 .send(user)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('user');
                     res.body.should.have.property('token');
                     auth.token = res.body.token;
                     done();
                 });
         });
     });

     describe('/GET user', () => {
         it('it should GET the user by auth token', (done) => {
             chai.request(server)
                 .get('/api/users')
                 .set('Authorization', 'Bearer ' + auth.token)
                 //.set('Accept', 'application/json')
                 .end((err, res) => {
                     res.body.should.be.a('object');
                     res.body.should.have.property('userId');
                     res.body.should.have.property('role');
                     done();
                 });
         });
     });

});