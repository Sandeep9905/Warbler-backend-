function errorHanler(error ,request ,response ,next){
    return response.status(error.status || 500).json({
        error:{
            message:error.message || "Oops Somthing went wrong!"
        }
    });
}

module.exports = errorHanler;