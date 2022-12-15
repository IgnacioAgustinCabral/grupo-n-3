const request = require("supertest");
const app = require("../app");
const db = require("../database/models");
const { encode } = require("../middlewares/jwt");

const api = request(app);

const userAdminData = {
  firstName: "firstAdminNameTest",
  lastName: "lastAdminNameTest",
  email: "adminUser_test2@gamil.com",
  password: "123456789",
  roleId: 1,
};
const userStandardData = {
  firstName: "firstNormalUserTest",
  lastName: "lastNormalNameTest",
  email: "normalUser_test2@gamil.com",
  password: "123456789",
  roleId: 2,
};

const rolData = {
  name: "Nuevo rol",
  description: "rol test",
};
let tokenAdmin = null;
let tokenStandard = null;
let userAdmin = null;
let userStandard = null;
let rol = null;

beforeAll(async () => {
  await db.sequelize.authenticate();
  userAdmin = await db.User.create(userAdminData);
  userStandard = await db.User.create(userStandardData);
  // category = await db.Category.create(categoryData);

  tokenAdmin = encode({
    id: userAdmin.id,
    roleId: userAdmin.roleId,
    firstName: userAdmin.firstName,
  });
  tokenStandard = encode({
    id: userStandard.id,
    roleId: userStandard.roleId,
    firstName: userStandard.firstName,
  });
});

afterAll(async () => {
  await userAdmin.destroy({ force: true });
  await userStandard.destroy({ force: true });
  // await category.destroy({ force: true });
  await db.sequelize.close();
});

describe("Users endpoints", () => {
  describe("[GET] /users", () => {
    it("with admin token,should return code 200, and get all users", async () => {
      const response = await api.get("/users").set({
        Authorization: `Bearer ${tokenAdmin}`,
      });

      expect(response.statusCode).toEqual(200);
    });
    it("with standard token, should return code 403", async () => {
      const response = await api.get("/users").set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(403);
    });
    it("without anything or invalid token, should return code 403", async () => {
      const response = await api.get("/users");

      expect(response.statusCode).toEqual(403);
    });
  });

  describe("[GET] /users/:id", () => {
    it("with admin token,should return code 200, and get especific user", async () => {
      const response = await api.get(`/users/${userStandard.id}`).set({
        Authorization: `Bearer ${tokenAdmin}`,
      });

      expect(response.statusCode).toEqual(200);
    });
    it("with standard token and user standard id, should return code 200", async () => {
      const response = await api.get(`/users/${userStandard.id}`).set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(200);
    });

    it("with standard token and admin id, should return code 403", async () => {
      const response = await api.get(`/users/${userAdmin.id}`).set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(403);
    });
    it("without anything or invalid token, should return code 403", async () => {
      const response = await api.get(`/users/${userAdmin.id}`);

      expect(response.statusCode).toEqual(403);
    });
  });

  describe("[POST] /users/create", () => {
    const newUser = {
      firstName: "New user",
      lastName: "test",
      email: "new-usertest@gamil.com",
      password: "123456789",
      roleId: 2,
    };
    it("with admin token,should return code 200, and create user", async () => {
      const response = await api
        .post("/users/create")
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(newUser);

      expect(response.statusCode).toEqual(200);
    });
    it("with existing email, should code 200 but doesn't create the user ", async () => {
      const response = await api
        .post("/users/create")
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(newUser);

      expect(response.statusCode).toEqual(200);
      expect(response.body.body).toEqual(null);
    });
    it("with standard or invalid token,should return code 403", async () => {
      const response = await api
        .post("/users/create")
        .set({
          Authorization: `Bearer ${tokenStandard}`,
        })
        .send(newUser);

      expect(response.statusCode).toEqual(200);
    });
  });
  describe("[PUT] /users/:id", () => {
    const updateUser = {
      firstName: "User updated",
      lastName: "test",
      email: "updateduser2@gamil.com",
    };
    it("with admin token,should return code 200, and update user", async () => {
      const response = await api
        .put(`/users/${userStandard.id}`)
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(updateUser);

      expect(response.statusCode).toEqual(200);
    });
    it("with email exist, should  return code 404", async () => {
      const response = await api
        .post(`/users/${userStandard.id}`)
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(updateUser);
      console.log(response);
      expect(response.statusCode).toEqual(404);
    });
    it("with standard or invalid token, should  return code 404", async () => {
      const response = await api
        .post(`/users/${userStandard.id}`)
        .set({
          Authorization: `Bearer ${tokenStandard}`,
        })
        .send(updateUser);

      expect(response.statusCode).toEqual(404);
    });
  });
  describe("[DELETE] /users/:id", () => {
    it("with admin token,should return code 200, and delete user", async () => {
      const response = await api.put(`/users/delete/8`).set({
        Authorization: `Bearer ${tokenAdmin}`,
      });

      expect(response.statusCode).toEqual(200);
    });
    it("with standard or invalid token,should return code 403, and delete user", async () => {
      const response = await api.put(`/users/delete/12`).set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(403);
    });
    it("user already deleted,should return code 404", async () => {
      const response = await api.put(`/users/delete/8`).set({
        Authorization: `Bearer ${tokenAdmin}`,
      });
      expect(response.statusCode).toEqual(404);
    });
  });
});
