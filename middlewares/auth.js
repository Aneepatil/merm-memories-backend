 import jwt from 'jsonwebtoken'

 const auth = (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

        // token.length <500 then it's our own auth, if >500 then it's google auth
        const isCustonAuth = token?.length < 500;

        let decodedData;

        if(token && isCustonAuth){
            // For registed from rester  form
            decodedData = jwt.verify(token, process.env.JWT_TOKEN)

            req.userId = decodedData?.id
        }else{
            // For Google users
            decodedData = jwt.decode(token)

            // sub is a google's name for a specific Id that differentiate for every single User
            req.userId= decodedData?.sub
        }

        next()

    } catch (error) {
        res.status(500).json({message:error.message})
    }
 }

 export default auth