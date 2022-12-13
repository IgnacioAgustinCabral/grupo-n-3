const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { login } = require('../services/authServices');

const postLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await login({ email, password });
    endpointResponse({
      res,
      code: 200,
      body: { token },
    });
  } catch (error) {
    res.status(401).json({ ok: false });
  }
});

module.exports = {
  postLogin,
};
