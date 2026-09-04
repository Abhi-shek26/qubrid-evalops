import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { AuthRequest, auth } from "../middleware/auth";

const router = Router();

router.post(
  "/projects/:projectId/ci-token",
  auth,
  async (req: AuthRequest, res) => {
    try {
      const projectId = String(req.params.projectId);

      // Make sure the project belongs to the logged-in user
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId!,
        },
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // Generate a secure random token
      const rawToken =
        "evalops_ci_" + crypto.randomBytes(32).toString("hex");

      // Hash the token before storing it
      const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      // Short identifier for displaying the token later
      const tokenPrefix = rawToken.slice(0, 16);

      // Remove existing token for this project
      await prisma.projectCiToken.deleteMany({
        where: {
          projectId,
        },
      });

      // Store only the hash
      await prisma.projectCiToken.create({
        data: {
          projectId,
          tokenHash,
          tokenPrefix,
        },
      });

      return res.status(201).json({
        success: true,
        data: {
          token: rawToken,
          tokenPrefix,
        },
        message:
          "CI token generated successfully. Store it securely because it will not be shown again.",
      });
    } catch (error) {
      console.error("CI token generation error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to generate CI token",
      });
    }
  }
);

router.delete(
  "/projects/:projectId/ci-token",
  auth,
  async (req: AuthRequest, res) => {
    try {
      const projectId = String(req.params.projectId);

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId!,
        },
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      await prisma.projectCiToken.updateMany({
        where: {
          projectId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      return res.json({
        success: true,
        message: "CI token revoked successfully",
      });
    } catch (error) {
      console.error("CI token revocation error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to revoke CI token",
      });
    }
  }
);

export default router;