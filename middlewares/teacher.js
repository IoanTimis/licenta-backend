const jwt = require("jsonwebtoken");

function isTeacher(req, res, next) {
  if (process.env.NODE_ENV === "test") {
    console.log("Test environment detected. Skipping authentication...");
    req.user = { id: 1, role: "teacher" };
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired Access Token" });
    }

    if (decoded.role !== "teacher") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { isTeacher };
