const { User } = require("../database/models");
const { genSaltSync, hashSync } = require("bcrypt");
const { ErrorObject } = require("../helpers/error");

async function findAllUsers(page) {
  let pageUrl = "http://localhost:3000/users?page=",
    prevPage = null,
    nextPage = null,
    limit = 10,
    offset = page * limit, //ex: page 0 * limit 10 = 0 - show since register 0-
    pages = 0; // quantity of pages

  const { count, rows } = await User.findAndCountAll({
    attributes: ["firstName", "lastName", "email", "createdAt"],
    limit,
    offset,
  });
  // ex: 12 registers / 10 limit = 2 pages in total - 1 because page initial value is 0
  pages = Math.ceil(count / limit) - 1;

  // actual page greater than 0 and actual page is less than  quantities of pages
  if (page > 0 && page <= pages) prevPage = `${pageUrl}${page - 1}`;

  // actual page is less than quantities of pages
  if (page < pages) nextPage = `${pageUrl}${page + 1}`;
  return { count, rows, prevPage, nextPage };
}
async function findOrCreateUser(
  { firstName, lastName, email, roleId, password },
  avatar
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
module.exports = {
  findAllUsers,
  findOrCreateUser,
  deleteUser,
};
