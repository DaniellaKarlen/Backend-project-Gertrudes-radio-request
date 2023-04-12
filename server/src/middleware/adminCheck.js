// Middleware function to check if user is an admin
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

// Middleware function to check if user is an admin
export async function isAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); // Forbidden
    res.send("Sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      const admin = jwt.verify(token, process.env.JWT_SIGN_KEY);
      console.log(admin);
      const user = await User.findById(admin.id);
      if (user && user.admin) {
        next(); // User is an admin, continue to the router handler
      } else {
        res.status(403); // Forbidden
        res.send("You are not authorized to access this endpoint");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}
