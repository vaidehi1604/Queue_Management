const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  const lang = req.getLocale();

  try {
    const token = await req.headers.authorization.split(" ")[1];
    console.log(token);
    //verify token
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    const user = await User.findOne({ email: decode.email });
    if (!decode) {
      return res.status(404).json({
        message: sails.__("notmatch", lang),
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: sails.__("authFail", lang),
    });
  }
};
