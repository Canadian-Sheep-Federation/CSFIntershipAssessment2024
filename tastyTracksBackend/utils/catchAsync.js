module.exports = (fn) => {
  //this method is recieving a funciton by catchAsync(function) and if we get an eror in it, it will sent it to next to handle the error
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
