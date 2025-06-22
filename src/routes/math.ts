import { getLCM, incrementNumber } from "@controllers/math";
import { Router } from "express";

const router = Router();

router.get("/lcm", getLCM);
router.get("/increment", incrementNumber);

export default router;
