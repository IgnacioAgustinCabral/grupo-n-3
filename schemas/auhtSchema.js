const loginSchema = {
  email: {
    isEmail: true,
  },
  password: {
    isString: true,
  },
};

module.exports = {
  loginSchema,
};
