import { Router } from "express";
import userController from "../controllers/UserController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

// Cadastro é a única rota aberta: quem ainda não tem conta não tem token.
router.post("/", userController.store);

// Daqui para baixo, tudo exige token válido. Update e delete não recebem :id
// de propósito — o usuário mexe em si mesmo, o id vem do token.
router.get("/", loginRequired, userController.index);
router.get("/:id", loginRequired, userController.show);
router.put("/", loginRequired, userController.update);
router.patch("/", loginRequired, userController.patch);
router.delete("/", loginRequired, userController.delete);

export default router;
