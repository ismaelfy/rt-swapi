const app = 'http://localhost:3000';
const request = require('supertest');

describe('POST / users', () => {
    describe("given a nombre, appellidos, correo y contrasena", () => {
        const userData = {
            nombre: "Ismael",
            apellidos: "Fernandez",
            correo: "ismael.fernandez@gmail.com",
            contrasena: "12345sd"
        }

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/users").send(userData);
            expect(response.statusCode).toBe(200);
        });

        test("should have a Content-Type: application/json header", async () => {
            const response = await request(app).post("/users").send(userData);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });

        test("should respond with an user ID", async () => {
            const response = await request(app).post("/users").send(userData);
            expect(response.body.id).toBeDefined();
        });

        describe("when the nombre,apellidos, correo and contrasena is missing", () => {
            test("shoud respond with a 400 status code", async () => {
                const fields = [
                    { nombre: "Ismael", },
                    { apellidos: "Fernandez" },
                    { correo: "ismael.fernandez@gmail.com" },
                    { contrasena: "12345sd" }
                ];

                for (const body of fields) {
                    const response = await request(app).post("/users").send(body);
                    expect(response.statusCode).toBe(400);
                }
            });
        })

    });
})

