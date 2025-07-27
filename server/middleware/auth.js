import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  // console.log("HEADERS:", req.headers);

  // console.log(req.headers.authorization);
  const token = req.headers.authorization;

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("token verified from auth.js");

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
