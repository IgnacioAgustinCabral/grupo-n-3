const { User } = require("../database/models");
const { genSaltSync, hashSync } = require("bcrypt");
const { ErrorObject } = require("../helpers/error");

async function findOrCreateUser({
  firstName,
  lastName,
  email,
  roleId,
  avatar,
  password,
}) {
  const saltRounds = genSaltSync(10);
  const hashPassword = hashSync(password, saltRounds);
  if (!hashPassword) throw new ErrorObject("Hash error", 400);
  return await User.findOrCreate({
    where: {
      email,
    },
    defaults: {
      firstName,
      lastName,
      email,
      password: hashPassword,
      avatar,
      roleId,
    },
  });
}
async function deleteUser(id) {
  const userDeleted = await User.destroy({
    where: { id },
  });
  if (!userDeleted) throw new ErrorObject("User not found", 404);

  return userDeleted;
}
module.exports = {
  findOrCreateUser,
  deleteUser,
};
