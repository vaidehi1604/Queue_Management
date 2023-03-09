const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  //admin signup
  adminSignup: async (req, res) => {
    const language = req.getLocale();
    const { userName, email, password,role } = req.body;
    const admin = await Admin.find({ email });
    //check email already exist or not

    if (admin.length >= 1) {
      return res.status(409).json({
        message: sails.__("email", language),
      });
    }
    //generate hash code for password

    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const newAdmin = await Admin.create({
          userName,
          email,
          password: hash,
          role
        }).fetch();

        return res.status(201).json({
          message: sails.__("adminAdd", language),
        });
      } catch (error) {
        error: error;
      }
    });
  },

  //   admin login

  adminLogin: async (req, res) => {
    const language = req.getLocale();
    const { email, password } = req.body;
    console.log(password);
    try {
      const admin = await Admin.findOne({ email: email });
      console.log(admin);
      const checkpass = await bcrypt.compare(password, admin.password);
      if (checkpass === true) {
        token = await jwt.sign({ email, password }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
      }
      await Admin.updateOne({ email: email }, { token: token });
      console.log(token);
      return res.status(200).json({
        message: sails.__("token", language),
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: sails.__("notToken", language),
      });
    }
  },

  //admin logout

    adminLogout: async (req, res) => {
      const language = req.getLocale();

      const { email } = await req.body;
      console.log(email);

      const admin = await Admin.findOne({ email });
      const adminUpdate = await Admin.updateOne({ email }).set({ token: " " });
      return res.status(200).json({
        message: sails.__("adminLogout", language),
      });
    },
};
