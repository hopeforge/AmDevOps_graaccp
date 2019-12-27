const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const user = require("./factory/user");
var token;

describe('POST /user', function () {
    it('Shoud register user', async done => {
        jest.setTimeout(30000);
        const response = await request.post('/api/register').send(user)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Usuário cadastrado com sucesso')
        done()
    })

    it('Shoud login user', async done => {
        jest.setTimeout(30000);
        return request.post('/api/login')
            .send({ password: user.password, email: user.email })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                token = response.body.data
                done()
            })
    })

    it('Shoud confirm token', async done => {
        jest.setTimeout(30000);
        return request.post('/login/verifyToken')
            .send({ userTk: token })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                return done();
            })
             
    })

})