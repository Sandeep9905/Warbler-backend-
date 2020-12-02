const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://sandeep9905:sandeep123@cluster0.6kdqn.mongodb.net/warbler?retryWrites=true&w=majority",{keepAlive:true, useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true});
module.exports.User = require("./user");
module.exports.Message = require("./message");
