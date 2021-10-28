const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  try {
    const { headers } = req;
    const { token } = headers;
    let secret = process.env.SECRET;
    const authenticated = await jwt.verify(token, "tralala", {
      algorithm: "HS256",
    });
    if (authenticated) req.authenticated = authenticated;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: "Authentication Failed",
      error: error.message,
    });
  }
};

module.exports = authentication;
