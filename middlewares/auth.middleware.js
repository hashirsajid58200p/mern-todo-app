const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || (!authHeader.startsWith("Bearer ") && !authHeader.startsWith("bearer "))) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "unauthorized",
        });
      } else {
        req.body = req.body || {}; // <-- Add this line
        req.body.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Please provide auth token",
      error,
    });
  }
};
