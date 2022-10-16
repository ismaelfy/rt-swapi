const app = 'http://localhost:3000';
const request = require("supertest");

describe("GET / peoples", () => {

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/peoples").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an json body", async () => {
        const response = await request(app).get('/peoples').send();
        expect(response.body).toBeInstanceOf(Object);

    })

    test("should respond with Content-type: application/json in header", async () => {
        const response = await request(app).get('/peoples').send()
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        )
    })

    test("should respond with status code 500 if the page param is not a number", async () => {
        let page = "a";
        const response = await request(app).get(`/peoples?page=${page}`).send();
        expect(response.statusCode).toBe(500)
    })


})