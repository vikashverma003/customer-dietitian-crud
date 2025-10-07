const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("proooo");
  let token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
