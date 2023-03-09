

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    console.log(token);
    //verify token
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
//    const admin = await Admin.findOne(decode.email)
   
    if(!decode){
      return res.status(400).json({message:"token not match"});
    }
    
    // if(token!=decode.token){
    //   console.log("token not match");
    //   return res.status(401).json({
    //     message:"Authentication fail"
    //   })
    // }
    return next();
  }
   catch (error) {
    return res.status(401).json({
      message: "authentication failed!!!!!!",
    });
  }
};
