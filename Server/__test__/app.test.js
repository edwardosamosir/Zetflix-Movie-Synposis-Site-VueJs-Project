const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { decodeToken } = require("../helpers/jwt-encode-decode");
const { log } = require("console");

beforeAll(async () => {
    await sequelize.queryInterface.bulkInsert(
        "Users",
        require("../data.json").users.map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        })
    );

    await sequelize.queryInterface.bulkInsert(
        "Genres",
        require("../data.json").genres.map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        }),
        {}
    );

    await sequelize.queryInterface.bulkInsert(
        "Movies",
        require("../data.json").movies.map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        }),
        {}
    );

    await sequelize.queryInterface.bulkInsert(
        "Customers",
        require("../data.json").users.map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        })
    );
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Movies", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });

    await sequelize.queryInterface.bulkDelete("Genres", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });

    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Customers", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

const authData = {
    invalid_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjcyNzczNDU5fQ.no3s0pZ6KRDUz5BxYNhfpwtL8AQ00FvPxJHtKRL8j5w",
};

let access_token;

describe("POST /customers", () => {

    describe("/register", () => {
        it("should not have empty email field", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir997", password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email is required!");
        });

        it("should not have empty password field", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir997", email: "edwardosamosir@gmail.com" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password is required!");
        });

        it("email should not be empty string", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir997", email: '', password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email is required!");
        });

        it("password should not be empty string", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir997", password: '', email: "edwardosamosir@gmail.com" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password is required!");
        });

        it("success to register", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir1997", email: "edwardosamosir997@gmail.com", password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe("User with email edwardosamosir997@gmail.com and username edwardosamosir1997 is succesfully registered");
        });

        it("should not have duplicate email", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir997", email: "edwardosamosir997@gmail.com", password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email is already used, please use another email!");
        });

        it("should not have an invalid email format", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({ username: "edwardosamosir997", email: "edwardosamosir", password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email format is not valid!");
        });
    });

    describe("/login", () => {
        it("should not empty email field", async () => {
            const response = await request(app)
                .post("/customers/login")
                .send({ password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Email is Required!");
        });

        it("should not empty password field", async () => {
            const response = await request(app)
                .post("/customers/login")
                .send({ email: "edwardosamosir997@gmail.com" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Password is Required!");
        });

        it("should not wrong password or email", async () => {
            const response = await request(app)
                .post("/customers/login")
                .send({ email: "edwardosamosir997@gmail.com", password: "gkjhsadjkah" });
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Invalid Email or Password");
        });

        it("should success login", async () => {
            const response = await request(app)
            .post("/customers/login")
            .send({ email: "edwardosamosir997@gmail.com", password: "l154inb4b1$$" });
            expect(response.statusCode).toBe(200);
            expect(response.body.access_token).toEqual(expect.any(String));
            access_token = response.body.access_token;
        });


        describe("/favorites/:id", () => {
            it("should not have an invalid movies id", async () => {
              console.log(access_token, "<<<<< ini access token");
                const movieId = 1000;
              const response = await request(app)
                .post(`/customers/favorites/${movieId}`)
                .set("access_token", access_token);
              expect(response.statusCode).toBe(404);
              expect(response.body.message).toBe("Data Not Found");
            });
        
            it("should not have access but customer", async () => {
              const moviesId = 1;
              const response = await request(app)
                .post(`/customers/favorites/${moviesId}`)
                .set("access_token", authData.invalid_token);
              expect(response.statusCode).toBe(401);
              expect(response.body.message).toBe("Invalid Token");
            });
        
            it("should not have access before login", async () => {
              const moviesId = 1;
              const response = await request(app).post(
                `/customers/favorites/${moviesId}`
              );
              expect(response.statusCode).toBe(400);
              expect(response.body.message).toBe("Access required, please sign in first!");
            });
        
            it("should add movies to favorite", async () => {
              const moviesId = 1;
              const response = await request(app)
                .post(`/customers/favorites/${moviesId}`)
                .set("access_token", access_token);
              expect(response.statusCode).toBe(201);
            });
          });
    });

    

    describe("GET /customers", () => {
        describe("/movies", () => {
          it("should get all movies", async () => {
            const response = await request(app).get("/customers/movies");
            expect(response.statusCode).toBe(200);
            expect(response.body.result).toEqual(expect.any(Object));
          });
      
          it("should get filtered movies", async () => {
            const response = await request(app).get("/customers/movies?filter=Avengers,8,Science");
            expect(response.statusCode).toBe(200);
            expect(response.body.result).toEqual(expect.any(Object));
            response.body.result.data.forEach((e) => {
              expect(e.title).toEqual(expect.stringMatching("Avengers"));
              expect(e.rating).toBe(8); 
              expect(e.genre).toEqual(expect.stringMatching("Science"));
            });
          });
      
          it("should get all movies pagination", async () => {
            const page = 1;
            const response = await request(app).get(`/customers/movies?page=${page}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.result).toEqual(expect.any(Object));
            const lengthOfData = response.body.result.data.length;
            expect(lengthOfData).toBeLessThanOrEqual(9);
            expect(response.body.result.page).toBe(page);
          });
        });
      
        describe("/movies/:id", () => {
          it("should get movies with id", async () => {
            const moviesId = 1;
            const response = await request(app).get(`/customers/movies/${moviesId}`);
            expect(response.statusCode).toBe(200);
          });
      
          it("should not have invalid movies id", async () => {
            const moviesId = 1000;
            const response = await request(app).get(`/customers/movies/${moviesId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Data Not Found");
          });
        });
      
        describe("/favorites", () => {
          it("should get movies in favorite table with correct id", async () => {
            const response = await request(app)
              .get(`/customers/favorites`)
              .set("access_token", access_token);
            const { id } = decodeToken(access_token);
            expect(response.statusCode).toBe(200);
            expect(response.body[0].CustomerId).toBe(id);
            });
          });
        });
});
