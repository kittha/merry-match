const skipJsonParsing = (req, res, next) => {
  if (req.originalUrl.startsWith("/rawdata")) {
    req.headers["content-type"] = "text/plain";
    req.headers["accept"] = "text/plain";
  }
  return next();
};

export default skipJsonParsing;
