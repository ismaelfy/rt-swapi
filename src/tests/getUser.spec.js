const { getUser } = require("../getUser");
const { eventGenerator } = require("../utils/eventGenerator");

describe("GET / users", () => {
    test("should respond with Content-type: application/json in header", async () => {
        const response = await getUser(eventGenerator({ pathParameters: { id: "8cb17fbe-322a-41d0-90a1-ded52327f770" } }));
        expect(response.headers['Content-type']).toEqual(
            expect.stringContaining("json")
        )
       
    });
})