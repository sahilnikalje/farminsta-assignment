const jwt=require('jsonwebtoken')

const verifyAccessToken=(token)=>{
    const secret=process.env.JWT_ACCESS_SECRET
    if(!secret){
        throw new Error('JWT_ACCESS_SECRET is not defined')
    }
 return jwt.verify(token, secret)
}

const verifyRefreshToken=(token)=>{
    const secret=process.env.JWT_REFRESH_SECRET
    if(!secret){
        throw new Error('JWT_REFRESH_SECRET is not defined')
    }
 return jwt.verify(token, secret)
}

module.exports={verifyAccessToken, verifyRefreshToken}
