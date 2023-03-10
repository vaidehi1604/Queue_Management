const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  //user signup

  userSignup: async (req, res) => {
    const { username, email, password, role } = req.body;
    
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
     const users=await User.find({email:req.body.email});
     if (users.length >= 1) {
      return res.status(409).json({
        message: "Email already exists",
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
          message: "Data added successfully!!!",
        });
      } catch (error) {
        return res.status(401).json({
          message: "Data not added!!",
        });
      }
    });
  },

  //user login
  userLogin: async (req, res) => {
    try {
    const { email, password } = req.body;
    console.log(req.body);
      const user = await User.findOne({ email:email });
      console.log(user);
      const checkpass = await bcrypt.compare(password, user.password);
      if (checkpass === true) {
        token = await jwt.sign({ email, password }, process.env.JWT_KEY, {
          expiresIn: "8h",
        });
      }
      console.log(token);
      await User.updateOne({ email: email }, { token: token });
      console.log(token);
      return res.status(201).json({
        message: "Token generated",
        token: token,
      });
    } catch (error) {
      error: error;
      return res.status(401).json({
        message: "Token not generated!!",
      });
    }
  },

  //user logout



  userLogout: async (req, res) => {
    try {
      const  {email}= req.body;
      console.log(email);
      const users =await User.findOne({email})
      console.log(users);
const userUpdate=await User.updateOne({email}).set({token:" "})

      return res.status(200).json({
        message: "Logout successfully!!",
      });
    } catch (error) {
      return res.status(200).json({
        message: "logout not successfull!!",
      });
    }
  },


  // userLogout: async (req, res) => {
  //   try {
  //     const { id } = await req.body;
  //     console.log(id);

  //     const user = await User.findOne({id:id});
  //     console.log(user);
  //     // if(id==user.id){
  //       const userUpdate = await User.updateOne({ id: id },{ token: " " });
  //     console.log(userUpdate);
  //     // }
  //     return res.status(200).json({
  //       message: "Logout successfully!!",
  //     });
  //   } catch (error) {
  //     return res.status(200).json({
  //       message: "logout not successfull!!",
  //     });
  //   }
  // },

  //find user ticket with place
  userTicket: async (req, res) => {
    try {
      // const {id}=req.params
      const places = await Place.find();
      console.log(places);
      return res.status(200).json({
        message: "Unprocess Tickets with place",
        place: places,
      });
    } catch (error) {
      return res.status(401).json({
        message: "Ticket not found!",
      });
    }
  },
};
