// middleware/authorizeRole.js

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    console.log(req.user.role);
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    next();
  };
};

// This allows you to restrict any route like:

// router.get("/", protect, authorizeRole("dietitian", "advisor"), handler);

module.exports = authorizeRole;
