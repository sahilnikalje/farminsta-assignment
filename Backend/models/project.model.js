const mongoose=require('mongoose')

const projectSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true}
},{
    timestamps:true
})

module.exports=mongoose.model('Project', projectSchema)