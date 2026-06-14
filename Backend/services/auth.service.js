const bcrypt=require('bcryptjs')
const {User}=require('../models/user.model')
const {generateAccessToken, generateRefreshToken}=require('../utils/generateTokens')
const {verifyRefreshToken}=require('../utils/verifyToken')

const registerUser=async(data)=>{
    const existingUser=await User.findOne({email:data.email})
    if(existingUser){
        throw new Error('Email is already registered')
    }

    const hashedPassword=await bcrypt.hash(data.password, 10)

    await User.create({
        name:data.name,
        email:data.email,
        password:hashedPassword,
    })
}


const loginUser=async(data)=>{
  const user=await User.findOne({email:data.email})
    if(!user){
        throw new Error('Invalid email or password')
    }
  
  const isMatch=await bcrypt.compare(data.password, user.password)
    if(!isMatch){
        throw new Error('Invalid credentials')
    }

  const payload={userId:user._id.toString(), role:user.role}

  const accessToken=generateAccessToken(payload)
  const refreshToken=generateRefreshToken(payload)

 user.refreshToken=refreshToken
 await user.save()

 return{
    accessToken,
    refreshToken,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
 }
}

const refreshAccessToken=async(token)=>{
    let decoded
    try{
        decoded=verifyRefreshToken(token)
    }
    catch{
        throw new Error('Invalid token')
    }
 const user=await User.findById(decoded.userId)
   if(!user || user.refreshToken!==token){
    throw new Error('Invalid token')
   }
 const accessToken=generateAccessToken({userId:user._id.toString(), role:user.role})
 return {accessToken}
}

const logoutUser=async(token)=>{
    let decoded
    try{
        decoded=verifyRefreshToken(token)
    }
    catch{
        throw new Error('Invalid refresh token')
    }
 await User.findByIdAndUpdate(decoded.userId, {refreshToken:null})
}

module.exports={registerUser, loginUser, refreshAccessToken, logoutUser}