const createHttpError = require("http-errors");

const httpUnauthorizedError = createHttpError(
  403,
  `[Error] - [Unauthorized]: ${"Access denied"}`,
);

const isAdminRole = (req, res, next) => {
  try {
    const user = req.user;

    const userIsAdmin = user.roleId === 1;
    if (!userIsAdmin) next(httpUnauthorizedError);

    return next();
  } catch (error) {
    next(httpUnauthorizedError);
  }
};

module.exports = {
  isAdminRole,
  httpUnauthorizedError
};
