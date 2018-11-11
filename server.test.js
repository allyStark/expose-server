const request = require('supertest');
const expect = require('expect');
const rewire = require('rewire');

let app = rewire('./server').app;

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
    })
})
