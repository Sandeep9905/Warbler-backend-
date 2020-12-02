require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const errorHanler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const {loginRequired , ensureCorrectUser} = require("./middleware/auth");
const  db  = require("./models");
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth",authRoutes);

app.use("/api/user/:id/messages",
        loginRequired ,
        ensureCorrectUser,
        messageRoutes);

app.get("/api/messages" ,loginRequired ,async function(req , res ,next){
    try{
      let messages = await db.Message.find()
                                  .sort({createdAt:"desc"})
                                  .populate("user",{
                                      username:true,
                                      profileImageUrl:true
                                  });
      return res.status(200).json(messages);
    }catch(err){
        return next(err);
    }
});        

app.use(function(req , res ,next){
    let err = new Error("Not Found!");
    err.status = 404;
    next(err);
});

app.use(errorHanler);

app.listen(PORT , function(){
    console.log(`Server is running on ${PORT}`)
});