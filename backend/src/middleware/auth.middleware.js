import { getAuth } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    console.log("USER ID =>", userId);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized - you must be logged in",
      });
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.log("AUTH ERROR =>", error);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
