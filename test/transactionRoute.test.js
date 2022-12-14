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

beforeAll(async () => {
  await db.sequelize.authenticate();
  userStandar = await db.User.create(userStandarData);
  category = await db.Category.create(categoryData);
  tokenAccess = encode({
    id: userStandar.id,
    roleId: userStandar.roleId,
    firstName: userStandar.firstName,
  });
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
      const transaction = {
        userId: userStandar.id,
        categoryId: category.id,
        amount: 14.552,
        date: "2022-09-05",
      };

      const response = await api
        .post("/transactions")
        .set({
          Authorization: `Bearer ${tokenAccess}`,
        })
        .send(transaction);

      expect(response.statusCode).toEqual(201);
    });
  });
});
