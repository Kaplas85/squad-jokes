import { notificatorController } from "@controllers/notificator";
import { Router } from "express";

const router = Router();

router.post("/", notificatorController);

export default router;
