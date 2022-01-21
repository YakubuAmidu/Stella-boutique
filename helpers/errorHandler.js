function errorHandler(err, res, req, nex){

    //Jwt authorization Error
   if(err.name === 'UnauthorizedError'){
       return res.status(401).json({ message: 'The user is not authorized🚫' });
   } 
    
   // Validation Error
    if(err.name === 'ValidationError'){
       return res.status(401).json({ message: err });
   } 
   
     // Server error
   return res.status(500).json(err);
}

 module.exports = errorHandler;