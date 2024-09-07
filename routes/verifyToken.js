import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function verifyToken(req, res, next) {
  const authHeader = req?.headers?.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      const verifiedUser = await User.findById(user.id);
      if (!verifiedUser) {
        return res.status(404).json("User not found!");
      }

      req.user = verifiedUser;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
