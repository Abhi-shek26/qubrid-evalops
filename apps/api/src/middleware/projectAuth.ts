import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { config } from "../lib/config";
import { prisma } from "../lib/prisma";

export interface ProjectAuthRequest extends Request {
  userId?: string;
  ciProjectId?: string;
}

export async function projectAuth(
  req: ProjectAuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = header.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  /*
   * First try the normal JWT.
   */
  try {
    const decoded = jwt.verify(
      token,
      config.jwtSecret
    ) as { userId: string };

    req.userId = decoded.userId;

    return next();
  } catch {
    // Not a JWT. Try CI token below.
  }

  /*
   * Try project CI token.
   */
  try {
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const ciToken = await prisma.projectCiToken.findUnique({
      where: {
        tokenHash,
      },
    });

    if (!ciToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (ciToken.revokedAt) {
      return res.status(401).json({
        success: false,
        message: "CI token has been revoked",
      });
    }

    req.ciProjectId = ciToken.projectId;

    return next();
  } catch (error) {
    console.error(
      "Project authentication error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
}