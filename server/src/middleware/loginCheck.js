import jwt from "jsonwebtoken";

export async function login(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //Forbidden
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = jwt.verify(token, process.env.JWT_SIGN_KEY);

      req.user = user;
      next();
    } catch (error) {
      console.log(error.message);
      res.status(403).json("Not signed in");
    }
  }
}
