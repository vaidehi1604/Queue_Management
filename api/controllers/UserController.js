const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  //user signup

  userSignup: async (req, res) => {
    const lang = req.getLocale();
    const { username, email, password, role } = req.body;

    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const users = await User.find({ email: req.body.email });
        if (users.length >= 1) {
          return res.status(409).json({
            message: sails.__("email", lang),
          });
        }

        const newUser = await User.create({
          username,
          email,
          password: hash,
          role,
        }).fetch();

        console.log(newUser);
        return res.status(201).json({
          message: sails.__("addData", lang),
        });
      } catch (error) {
        return res.status(500).json({
          message: sails.__("notAdded", lang),
        });
      }
    });
  },

  //user login
  userLogin: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ email: email });
      console.log(user);
      const checkpass = await bcrypt.compare(password, user.password);
      if (checkpass === true) {
        try {
          const token = await sails.helpers.generateToken(email, user.id, "8h");
          console.log(token);
          const userUpdate = await User.updateOne({ email }, { token: token });
          return res.status(200).json({
            message: sails.__("token", lang),
            token: token,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: error + "err",
            message: sails.__("nottoken", lang),
          });
        }
      } else {
        return res.status(200).json({
          message: sails.__("token", lang),
          token: token,
        });
      }
    } catch (error) {
      error: error;
      return res.status(500).json({
        message: sails.__("notToken", lang),
      });
    }
  },

  //user logout

  userLogout: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { email } = req.userData;
      console.log(email);
      const users = await User.findOne({ email });
      console.log(users);
      const userUpdate = await User.updateOne({ email }).set({ token: " " });

      return res.status(200).json({
        message: sails.__("userLogout", lang),
      });
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notLogout", lang),
      });
    }
  },
};
