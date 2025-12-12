import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //id + role
    next();
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error while getting token!" });
  }
};
export default authMiddleware;
