const errorHandler = (err, res,  req, next) => {
  if(err.name === "UnauthorizeError"){
    res.status(401).json({ message: 'The user is not authorized!'})
  } else if(err.name === "ValidationError"){
      return res.status(401).json({ message: err });
  } else {
    return res.status(500).json({ err });
  }
}

module.exports = errorHandler;