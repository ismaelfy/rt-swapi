
const app = 'http://localhost:3000';
const request = require("supertest");

describe("GET / peoples", () => {

    test("should respond with a 200 status code", async () => {
        let id = 1;
        const response = await request(app).get(`/peoples/${id}`).send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond a json as a content type", async () => {
        let id = 1;
        const response = await request(app).get(`/peoples/${id}`).send();
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });


    test("should respond with status code 500 if the id parameter passed as string", async () => {
        let id = "a";
        const response = await request(app).get(`/peoples/${id}`).send();
        expect(response.statusCode).toBe(500)
    })

})  