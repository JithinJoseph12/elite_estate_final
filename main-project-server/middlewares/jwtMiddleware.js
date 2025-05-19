const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  console.log("Inside middleware");
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
      console.log("Verified JWT:", jwtResponse);
      req.userId = jwtResponse.userId;
      next(); // Only call next() if token is valid
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(401).json("Authorization failed. Please log in again.");
    }
  } else {
    return res.status(401).json("Token is missing");
  }
};
module.exports = jwtMiddleware;
