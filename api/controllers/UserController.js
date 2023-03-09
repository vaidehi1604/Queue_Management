const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  //user signup

  userSignup: async (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const newUser = await User.create({
          username,
          email,
          password: hash,
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
  userLogin:async(req,res)=>{
    const {email,password}=req.body;
    try{
 const user=await User.findOne({email})
 const checkpass=await bcrypt.compare(password, user.password);
 if(checkpass==true){
    token = await jwt.sign({ email, password }, process.env.JWT_KEY, {
        expiresIn: "8h",
      });
    }
      await User.updateOne({ email: email }, { token: token });
      console.log(token);
      return res.status(201).json({
        message:"Token generated",
        token:token
        
      })
 

    }
    catch(error){
        error:error
        return res.status.json({
            message:"Token not generated"
        })
    }
  },

 //user logout

 userLogout: async (req, res) => {
    try{
    const { id } = await req.body;
    console.log(id);

    const user = await User.findOne({ id });
    console.log(user.id);
    if(id==user.id){
    const userUpdate = await User.updateOne({ id }).set({ token: " " });
    }
    return res.status(200).json({
      message: "Logout successfully!!"
    });
}catch(error){
    return res.status(200).json({
        message: "logout not successfull!!"
      });
}
  },
};
