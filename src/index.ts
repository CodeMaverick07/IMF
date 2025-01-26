import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import gadgetRoutes from "./routes/gadgetRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use("/gadgets", gadgetRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to IMF API");
});

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`IMF Gadget API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
