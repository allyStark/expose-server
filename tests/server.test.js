const request = require('supertest');
const expect = require('expect');
const rewire = require('rewire');

const {app} = rewire('./../server');
const {WebExt} = require('./../models/webext');

beforeEach((done) => {
    WebExt.remove({}).then(() => done());
});

describe('Server', () => {
    describe('GET /api', () => {
        it('should return hello world response', (done) => {
            request(app)
                .get('/api')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty('message', 'Hello world!');
                })
                .end(done);
        });
    });

    describe('POST /api/webextensions', () => {
        it('should create a new webextension', (done) => {
            let name = 'test-extension';

            request(app)
                .post('/api/webextensions')
                .send({name})
                .expect(200)
                .expect((res) => {
                    expect(res.body.name).toBe(name)
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    WebExt.find().then((webexts) => {
                        expect(webexts.length).toBe(1);
                        expect(webexts[0].name).toBe(name);
                        done();
                    }).catch((e) => done(e));
                });
        });
    })
})
