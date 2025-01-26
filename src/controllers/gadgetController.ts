import jwt from "jsonwebtoken";
import { Response } from "express";
import { PrismaClient, GadgetStatus } from "@prisma/client";
import {
  generateCodename,
  generateConfirmationCode,
  generateSuccessProbability,
} from "../utils/codeGenerator";
import { AuthRequest } from "../types";

const prisma = new PrismaClient();

export const getAllGadgets = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const gadgets = await prisma.gadget.findMany({
      where: status ? { status: status as GadgetStatus } : {},
    });

    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget,
      successProbability: `${generateSuccessProbability()}%`,
    }));

    res.json(gadgetsWithProbability);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createGadget = async (req: AuthRequest, res: Response) => {
  try {
    console.log("inside create gadget", req.body.name);
    const { name } = req.body;
    const gadget = await prisma.gadget.create({
      data: {
        name,
        codename: generateCodename(),
      },
    });
    res.status(201).json(gadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGadget = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedGadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const decommissionGadget = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
        decommissionedAt: new Date(),
      },
    });
    res.json({ message: "Gadget decommissioned" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const selfDestructGadget = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { confirmationCode } = req.body;

    if (confirmationCode !== "1234") {
      res.status(400).json({ error: "Invalid confirmation code" });
      return;
    }

    await prisma.gadget.update({
      where: { id },
      data: { status: "Destroyed" },
    });

    res.json({ message: "Gadget self-destructed" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAgent = async (req: AuthRequest, res: Response) => {
  console.log("inside the login");
  const token = jwt.sign({ id: "agent123" }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  res.json({ token });
};
