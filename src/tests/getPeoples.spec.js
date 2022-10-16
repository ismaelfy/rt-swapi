const { getPeoples } = require("../getPeoples");
const { eventGenerator } = require("../utils/eventGenerator");

describe("GET / peoples", () => {
    test("should respond with a 200 status code", async () => {
        const response = await getPeoples(eventGenerator({}));
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an object", async () => {
        const response = await getPeoples(eventGenerator({}))
        expect(response.body).toBeInstanceOf(Object);
    })

    test("should respond with Content-type: application/json in header", async () => {
        const response = await getPeoples(eventGenerator({}))
        expect(response.headers['Content-type']).toEqual(
            expect.stringContaining("json")
        )
    })

    test("should respond with status code 500 if the :page param is not a number", async () => {
        const response = await getPeoples(eventGenerator({ queryStringParameters: { page: "a" } }))
        expect(response.statusCode).toBe(500)
    })


})