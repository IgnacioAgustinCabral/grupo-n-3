const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { login } = require('../services/authServices');

const postLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await login({ email, password });
    endpointResponse({
      res,
      code: 200,
      body: user,
    });
  } catch (error) {
    res.status(401).json({ ok: false });
  }
});

module.exports = {
  postLogin,
};
