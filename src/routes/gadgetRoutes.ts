import express from "express";
import {
  getAllGadgets,
  createGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
  loginAgent,
} from "../controllers/gadgetController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate, getAllGadgets);
router.post("/", authenticate, createGadget);
router.patch("/:id", authenticate, updateGadget);
router.delete("/:id", authenticate, decommissionGadget);
router.post("/:id/self-destruct", authenticate, selfDestructGadget);
router.post("/login", loginAgent);

export default router;
