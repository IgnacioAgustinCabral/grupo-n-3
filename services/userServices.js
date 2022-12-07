const { User } = require("../database/models");
const { genSaltSync, hashSync } = require("bcrypt");
const { ErrorObject } = require("../helpers/error");

async function findOrCreateUser(
  { firstName, lastName, email, roleId, password },
  avatar,
) {
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
      avatar: avatar ? `public/uploads/${avatar.filename}` : null,
      roleId: Number(roleId),
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

async function findOneUser({ id, email }) {
  const where = id ? { id } : { email };
  const user = await User.findOne({ where });

  if (!user) {
    throw new ErrorObject("User not found", 404);
  }
  return user;
}

module.exports = {
  findOrCreateUser,
  deleteUser,
  findOneUser,
};
