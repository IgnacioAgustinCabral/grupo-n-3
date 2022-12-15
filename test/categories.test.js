const request = require("supertest");
const app = require("../app");
const db = require("../database/models");
const { encode } = require("../middlewares/jwt");

const api = request(app);

const userAdminData = {
  id: 125,
  firstName: "firstAdminNameTest",
  lastName: "lastAdminNameTest",
  email: "adminUser_test@gamil.com",
  password: "123456789",
  roleId: 1,
};
const userStandardData = {
  id: 126,
  firstName: "firstNormalUserTest",
  lastName: "lastNormalNameTest",
  email: "normalUser_test@gamil.com",
  password: "123456789",
  roleId: 2,
};

const categoryData = {
  name: "categoryTest",
  description: "category test",
};
let tokenAdmin = null;
let tokenStandard = null;
let userAdmin = null;
let userStandard = null;
let category = null;

beforeAll(async () => {
  await db.sequelize.authenticate();
  userAdmin = await db.User.create(userAdminData);
  userStandard = await db.User.create(userStandardData);
  category = await db.Category.create(categoryData);

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
  await db.Transaction.destroy({ where: {}, force: true });
  await userAdmin.destroy({ force: true });
  await userStandard.destroy({ force: true });
  await category.destroy({ force: true });
  await db.sequelize.close();
});

describe("Categories endpoints", () => {
  describe("[GET] /categories", () => {
    it("should return code 200, and get all categories", async () => {
      const response = await api.get("/categories").set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(200);
    });
    it("without token, should return code 403", async () => {
      const response = await api.get("/categories");

      expect(response.statusCode).toEqual(403);
    });
  });

  describe("[GET] /categories/:id", () => {
    it("should get one categories and return code 200", async () => {
      const response = await api.get(`/categories/${category.id}`).set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(200);
    });
    it("should return none category and code 403 ", async () => {
      const response = await api.get(`/categories/${category.id}`);

      expect(response.statusCode).toEqual(403);
    });
  });

  describe("[POST] /categories", () => {
    it("should add one categorie and return code 200", async () => {
      const newCategory = {
        name: "test",
        description: "category test",
      };

      const response = await api
        .post("/categories")
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(newCategory);

      expect(response.statusCode).toEqual(200);
    });
    it("should return 401, not user admin for create category ", async () => {
      const newCategory = {
        name: "test2222",
        description: "category test",
      };

      const response = await api
        .post("/categories")
        .set({
          Authorization: `Bearer ${tokenStandard}`,
        })
        .send(newCategory);

      expect(response.statusCode).toEqual(401);
    });
  });

  describe("[PUT] /categories/:id", () => {
    it("should edit one categorie and return code 200", async () => {
      const newCategory = {
        name: "testput",
        description: "category testput",
      };

      const response = await api
        .put(`/categories/${category.id}`)
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(newCategory);

      expect(response.statusCode).toEqual(200);
    });
    it("should return code 404, not found category for edit", async () => {
      const newCategory = {
        name: "testput",
        description: "category testput",
      };

      const response = await api
        .put(`/categories/112`)
        .set({
          Authorization: `Bearer ${tokenAdmin}`,
        })
        .send(newCategory);

      expect(response.statusCode).toEqual(404);
    });
    it("should return code 403, not user admin for edit", async () => {
      const newCategory = {
        name: "testput",
        description: "category testput",
      };

      const response = await api
        .put(`/categories/${category.id}`)
        .send(newCategory);

      expect(response.statusCode).toEqual(403);
    });
  });
  describe("[DELETE] /categories/:id", () => {
    it("should remove one categorie and return code 200 ", async () => {
      const response = await api.delete(`/categories/${category.id}`).set({
        Authorization: `Bearer ${tokenAdmin}`,
      });

      expect(response.statusCode).toEqual(200);
    });
    it("should return code 404, not found category for remove ", async () => {
      const response = await api.delete(`/categories/112`).set({
        Authorization: `Bearer ${tokenAdmin}`,
      });

      expect(response.statusCode).toEqual(404);
    });
    it("should return code 401, not user admin for delete category ", async () => {
      const response = await api.delete(`/categories/${category.id}`).set({
        Authorization: `Bearer ${tokenStandard}`,
      });

      expect(response.statusCode).toEqual(401);
    });
  });
});
