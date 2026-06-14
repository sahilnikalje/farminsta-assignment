const {ZodError}=require('zod')

const validate=(schema)=>{
    return (req, res, next)=>{
        try{
            schema.parse(req.body)
            next()
        }
        catch(err){
            if(err instanceof ZodError){
                return res.status(400).json({
                    success:false,
                    message:err.errors[0].message
                })
            }
            next(err)
        }
    }
}

module.exports={validate}
