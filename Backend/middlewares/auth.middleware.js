const {verifyAccessToken}=require('../utils/verifyToken')

const authenticate=(req, res,next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success:false, message:'No token provided'})
    }
 const token=authHeader.split(' ')[1]

 try{
    const decoded=verifyAccessToken(token)
    req.user={userId:decoded.userId, role:decoded.role}
    next()
 }
 catch(err){
    console.error(err.message)
    return res.status(401).json({success:false, message:'Invalid token'})
 }
}

module.exports={authenticate}