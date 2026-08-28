import { Router } from "express";
import alunoController from "../controllers/AlunoController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.get("/", loginRequired, alunoController.index);
router.get("/:id", loginRequired, alunoController.show);
router.post("/", loginRequired, alunoController.store);
router.put("/:id", loginRequired, alunoController.update);
router.patch("/:id", loginRequired, alunoController.patch);
router.delete("/:id", loginRequired, alunoController.delete);

export default router;
