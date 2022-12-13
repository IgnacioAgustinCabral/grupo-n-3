const { compare } = require('bcrypt');
const { ErrorObject } = require('../helpers/error');
const { encode } = require('../middlewares/jwt');
const { findOneUser } = require('./userServices');

async function login({ email, password }) {
  const user = await findOneUser({ email });

  const isCorretPassword = await compare(password, user.password);
  if (!isCorretPassword) {
    throw new ErrorObject('Email or password invalid', 401);
  }

  const token = encode({ id: user.id, roleId: user.roleId, firstName: user.firstName })

  return { token };
}

module.exports = {
  login,
};
