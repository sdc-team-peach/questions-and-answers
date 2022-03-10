var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

const baseUrl = 'http://localhost:3001/';

describe('get questions endpoint', () => {
	it('should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('questions?product_id=5');
    expect(response.statusCode).to.equal(200);
	});
})

describe('get answers endpoint', () => {
	it('should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('questions/34/answers');
    expect(response.statusCode).to.equal(200);
	});
})

describe('post question endpoint', () => {
	it('should return a 201 status code', async () => {
		const response = await request(baseUrl)
      .post('questions')
      .send({"product_id": 1, "body": "my post test", "name": "dory", "email": "dory@yahoo.com"})
      expect(response.statusCode).to.equal(201);
	});
})

describe('post answer endpoint', () => {
	it('should return a 201 status code', async () => {
		const response = await request(baseUrl)
      .post('questions/36/answers')
      .send({"photos": '', "body": "my post test", "name": "dory", "email": "dory@yahoo.com"})
      expect(response.statusCode).to.equal(201);
	});
})
