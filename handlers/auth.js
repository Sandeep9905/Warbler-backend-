const db = require("../models");
const jsonwebToken = require("jsonwebtoken");

exports.signin = async function(req ,res ,next){
    try{
        let user =await db.User.findOne({
            email:req.body.email
        });
        let {id , username ,profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
           let token = jsonwebToken.sign(
               {
               id:id,
               username:username,
               profileImageUrl:profileImageUrl
              },
              process.env.SECRET_KEY
           );
           return res.status(200).json({
               id,username,profileImageUrl,token
           })
        }else{
            return next({
                status:400,
                message:"Invalid Email/Password."
            });   
        }
    }catch(e){
      return next({
          status:400,
          message:"Inavalid Email/Password."
        });
    }
}

exports.signup = async function(req , res ,next){
     try{
         let user = await db.User.create(req.body);
         let {id ,username ,profileImageUrl} = user;
         let token =jsonwebToken.sign(
             {
             id,
             username,
             profileImageUrl
             }
             ,process.env.SECRET_KEY);
        return res.status(200).json({
            id , username ,profileImageUrl ,token
        });
     }catch(err){
         if(err.code === 11000){
             err.message = "Sorry! That username and email already exists or taken."
         }
         return next({
             status:400,
             message:err.message
         });
     }
}