import { Router } from "express";
import LoanController from "../controllers/LoanController";

const router = Router();
router.post("/simulate", LoanController.simulate);
router.post("/apply", LoanController.apply);
router.get("/all", LoanController.all);

export default router;
