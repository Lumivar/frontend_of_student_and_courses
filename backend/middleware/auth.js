const jwt = require("jsonwebtoken");
exports.verification = (req,res,next)=>{
    const autheader = req.headers.autherization;
    if(!autheader){
        return res.status(401).json({
            success:false,
            message:"Access Denied. No token provided"
        })
    }
    const token = autheader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        req.user = decoded;
        next();
    } 
    catch (err) {
        return res.status(500).json({
            success:false,
            message:"Invalid or expired token"})
    }
}