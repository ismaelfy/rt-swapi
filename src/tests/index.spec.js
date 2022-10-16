const {getPeoples}  = require("../getPeoples");

const request = require("supertest");

secribe("GET / peoples",()=>{
    test("should respond with a 200 status code", async () => {
        const response = await request(getPeoples).get('/peoples').send();
        console.log(response)
    })


})