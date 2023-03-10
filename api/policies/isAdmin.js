const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decode.email });

    if (user.role === "a") {
      return next();
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};
