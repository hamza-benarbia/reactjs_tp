const config = require ("config");
const jwt = require ("jsonwebtoken") 
const auth =(req,res,next)=> {
    const token = req.header("x_auth_token");
    if (!token)
    return res.status("401").json({msg:"access denied,please login"});

try {
    const decoded = jwt.verify (token,config.get("jwt secret"));
    req.userid = decoded.id;
    next();
} catch (error)
  {
    return res
    .status ("400")
    .json({msg:"token not valid"});
  }
};
module.exports = auth;