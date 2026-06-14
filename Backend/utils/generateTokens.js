const jwt=require('jsonwebtoken')
const { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require("./constants")

const generateAccessToken=(payload)=>{
    const secret=process.env.JWT_ACCESS_SECRET
    if(!secret){
        throw new Error('JWT_ACCESS_SECRET is not defined')
    }
  return jwt.sign(payload, secret, {expiresIn:ACCESS_TOKEN_EXPIRY})
}

const generateRefreshToken=(payload)=>{
    const secret=process.env.JWT_REFRESH_SECRET
    if(!secret){
        throw new Error('JWT_REFRESH_SECRET is not defined')
    }
  return jwt.sign(payload, secret, {expiresIn:REFRESH_TOKEN_EXPIRY})
}

module.exports={generateAccessToken, generateRefreshToken}

