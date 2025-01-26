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

router.get("/", getAllGadgets);
router.post("/", createGadget);
router.patch("/:id", updateGadget);
router.delete("/:id", decommissionGadget);
router.post("/:id/self-destruct", selfDestructGadget);
router.post("/login", loginAgent);

export default router;
