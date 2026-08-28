import { Router } from "express";
import tokenController from "../controllers/TokenController.js";

const router = Router();

// Rota aberta: é aqui que o token nasce.
router.post("/", tokenController.store);

export default router;
