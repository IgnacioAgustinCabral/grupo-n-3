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

let userStandarToken = null;
let userAdminToken = null;
let userStandar = null;
let category = null;
let transaction = null;

beforeAll(async () => {
  await db.sequelize.authenticate();
  userStandar = await db.User.create(userStandarData);
  category = await db.Category.create(categoryData);
  userStandarToken = encode({
    id: userStandar.id,
    roleId: userStandar.roleId,
    firstName: userStandar.firstName,
  });
  
  userAdminToken = encode({
    id: 50,
    roleId: 1,
    firstName: "admin test",
  });

  transaction = {
    userId: userStandar.id,
    categoryId: category.id,
    amount: 14.557779,
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
    afterAll(async () => {
      await db.Transaction.destroy({ where: {}, force: true });
    });
    
    it("should add one transaction valid", async () => {
      const response = await api
        .post("/transactions")
        .set({
          Authorization: `Bearer ${userStandarToken}`,
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
          Authorization: `Bearer ${userStandarToken}`,
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
    afterAll(async () => {
      await db.Transaction.destroy({ where: {}, force: true });
    });

    it("should update an existing transaction", async () => {
      const transactionUpdateExpected = { description: "description test" };

      const response = await api
        .put(`/transactions/${transactionSaved.id}`)
        .set({
          Authorization: `Bearer ${userStandarToken}`,
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
          Authorization: `Bearer ${userStandarToken}`,
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
    afterAll(async () => {
      await db.Transaction.destroy({ where: {}, force: true });
    });
    it("should delete an existing transaction", async () => {
      const response = await api
        .delete(`/transactions/${transactionSaved.id}`)
        .set({
          Authorization: `Bearer ${userStandarToken}`,
        });

      expect(response.statusCode).toEqual(200);
    });
  });

  describe("[GET] /transaction/:id", () => {
    let transactionSaved = null;
    beforeAll(async () => {
      transactionSaved = await db.Transaction.create(transaction);
    });
    afterAll(async () => {
      await db.Transaction.destroy({ where: {}, force: true });
    });
    it("should get an existing transaction", async () => {
      const response = await api
        .get(`/transactions/${transactionSaved.id}`)
        .set({
          Authorization: `Bearer ${userStandarToken}`,
        });

      expect(response.statusCode).toEqual(200);
      expect(response.body.body.id).toEqual(transactionSaved.id);
      expect(response.body.body.amount).toEqual(transactionSaved.amount);
    });
  });

  describe("[GET] /transactions (all)", () => {
    let transactionSaved1 = null;
    let transactionSaved2 = null;
    beforeAll(async () => {
      transactionSaved1 = await db.Transaction.create(transaction);
      transactionSaved2 = await db.Transaction.create({
        ...transaction,
        amount: 22.59,
      });
    });
    afterAll(async () => {
      await db.Transaction.destroy({ where: {}, force: true });
    });
    it("should get transaction list by OwnerShip User", async () => {
      const response = await api
        .get(`/transactions?userId=${userStandar.id}`)
        .set({
          Authorization: `Bearer ${userStandarToken}`,
        });

      expect(response.statusCode).toEqual(200);
      expect(response.body.body.transactions.length).toEqual(2);
    });

    it("should return error (403) when standar user is not ownership", async () => {
      const userDiferentToken = encode({
        id: 6333,
        roleId: 2,
        firstName: "userDiferent",
      });

      const response = await api
        .get(`/transactions?userId=${userStandar.id}`)
        .set({
          Authorization: `Bearer ${userDiferentToken}`,
        });

      expect(response.statusCode).toEqual(403);
    });

    it("should get transactions list of an user as admin user authenticated", async () => {
      const response = await api
        .get(`/transactions?userId=${userStandar.id}`)
        .set({
          Authorization: `Bearer ${userAdminToken}`,
        });

      expect(response.statusCode).toEqual(200);
      expect(response.body.body.transactions.length).toEqual(2);
      
    });
  });
});
