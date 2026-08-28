import { Router } from "express";
import fotoController from "../controllers/FotoController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.get("/", loginRequired, fotoController.index);
router.get("/:id", loginRequired, fotoController.show);
router.post("/", loginRequired, fotoController.store);
router.delete("/:id", loginRequired, fotoController.delete);

export default router;
