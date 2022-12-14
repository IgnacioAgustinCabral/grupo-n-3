const request = require("supertest");
const app = require("../app");
const db = require("../database/models");
const { encode } = require("../middlewares/jwt");

const api = request(app);

const userStandarData = {
  firstName: "firstNameTest",
  lastName: "lastNameTest",
  email: "user_test@gamil.com",
  password: "123456789",
  roleId: 2,
};

const categoryData = {
  name: "categoryTest",
  description: "category test",
};
let tokenAccess = null;
let userStandar = null;
let category = null;
let transaction = null;

beforeAll(async () => {
  await db.sequelize.authenticate();
  userStandar = await db.User.create(userStandarData);
  category = await db.Category.create(categoryData);
  tokenAccess = encode({
    id: userStandar.id,
    roleId: userStandar.roleId,
    firstName: userStandar.firstName,
  });

  transaction = {
    userId: userStandar.id,
    categoryId: category.id,
    amount: 14.55,
    date: "2022-09-05",
  };
});

afterAll(async () => {
  await db.Transaction.destroy({ where: {}, force: true });
  await userStandar.destroy({ force: true });
  await category.destroy({ force: true });
  await db.sequelize.close();
});

describe("Transactions endpoints", () => {
  describe("[POST] /transaction", () => {
    it("should add one transaction valid", async () => {
      const response = await api
        .post("/transactions")
        .set({
          Authorization: `Bearer ${tokenAccess}`,
        })
        .send(transaction);

      expect(response.statusCode).toEqual(201);
    });

    it("should refuse to create transaction if user not authenticated", async () => {
      const response = await api.post("/transactions").send(transaction);

      expect(response.statusCode).toEqual(403);
    });

    it("should refuse to create transaction whit incorrect body", async () => {
      const transactionInvalid = {
        ...transaction,
        amount: undefined,
        categoryId: undefined,
      };

      const response = await api
        .post("/transactions")
        .set({
          Authorization: `Bearer ${tokenAccess}`,
        })
        .send(transactionInvalid);

      expect(response.statusCode).toEqual(400);
      expect(response.body.errors.length).toBeGreaterThan(1);
    });
  });

  describe("[Put] /transaction/:id", () => {
    let transactionSaved = null;
    beforeAll(async () => {
      transactionSaved = await db.Transaction.create(transaction);
    });

    it("should update an existing transaction", async () => {
      const transactionUpdateExpected = { description: "description test" };

      const response = await api
        .put(`/transactions/${transactionSaved.id}`)
        .set({
          Authorization: `Bearer ${tokenAccess}`,
        })
        .send(transactionUpdateExpected);

      expect(response.statusCode).toEqual(200);
      expect(response.body.body.description).toEqual(
        transactionUpdateExpected.description,
      );
    });

    it("should return an error (404) if the transaction does not exist", async () => {
      const invalidId = 100000;

      const response = await api
        .put(`/transactions/${invalidId}`)
        .set({
          Authorization: `Bearer ${tokenAccess}`,
        })
        .send({ description: "test" });

      expect(response.statusCode).toEqual(404);
    });

    it("Should return error (403) if the user is not ownership or admin", async () => {
      const accessToken = encode({
        id: 9023,
        roleId: 2,
        firstName: "a",
      });

      const response = await api
        .put(`/transactions/${transactionSaved.id}`)
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .send({ description: "test" });

      expect(response.statusCode).toEqual(403);
    });
  });

  describe("[Delete] /transaction/:id", () => {
    let transactionSaved = null;
    beforeAll(async () => {
      transactionSaved = await db.Transaction.create(transaction);
    });
    it("should delete an existing transaction", async () => {
      const response = await api
        .delete(`/transactions/${transactionSaved.id}`)
        .set({
          Authorization: `Bearer ${tokenAccess}`,
        });

      expect(response.statusCode).toEqual(200);
    });
  });
});
