const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise = Promise;
mongoose.connect("mongodb connect url",{keepAlive:true, useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true});
module.exports.User = require("./user");
module.exports.Message = require("./message");
