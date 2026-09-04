import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma";

export interface CiAuthRequest extends Request {
  ciProjectId?: string;
}

export async function ciAuth(
  req: CiAuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "CI token required"
    });
  }

  try {
    const token = header.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "CI token required"
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const ciToken = await prisma.projectCiToken.findUnique({
      where: {
        tokenHash
      }
    });

    if (!ciToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid CI token"
      });
    }

    if (ciToken.revokedAt) {
      return res.status(401).json({
        success: false,
        message: "CI token has been revoked"
      });
    }

    req.ciProjectId = ciToken.projectId;

    next();
  } catch (error) {
    console.error("CI authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "CI authentication failed"
    });
  }
}