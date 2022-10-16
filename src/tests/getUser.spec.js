const app = 'http://localhost:3000';
const request = require('supertest');

describe("GET / users", function () {
    const id = "583a4160-44bb-4b82-b8b2-d2b1146e03df";

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get(`/users/${id}`).send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond a json as a content type", async () => {
        const response = await request(app).get(`/users/${id}`).send();
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining("json")
        );

    });

})