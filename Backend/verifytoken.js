const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accesstoken;

  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token Provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
    }

    req.user = decoded; // Attach user info to request object
    next();
  });
};

module.exports = verifyToken;
