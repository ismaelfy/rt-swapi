const { getPeople } = require("../getPeople");
const { eventGenerator } = require("../utils/eventGenerator");

describe("GET / peoples", () => {
    test("you must reply with the status code 200 and object if you are looking for a person by id", async () => {
        const response = await getPeople(eventGenerator({ pathParameters: { id: 1 } }))
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Object);
    })

    test("should respond with status code 500 if the id parameter passed as string", async () => {
        const response = await getPeople(eventGenerator({ pathParameters: { id: "a" } }))
        expect(response.statusCode).toBe(500)
        expect(response.body).toBeInstanceOf(Object);
    })

})  