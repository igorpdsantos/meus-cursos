import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { resolve } from "path";

import "./src/database/index.js";
import homeRoutes from "./src/routes/homeRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import alunoRoutes from "./src/routes/alunoRoutes.js";
import tokenRoutes from "./src/routes/tokenRoutes.js";
import fotoRoutes from "./src/routes/fotoRoutes.js";

/* global __dirname */

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // Serve as imagens enviadas: é o que faz a URL virtual da Foto abrir.
    this.app.use("/uploads", express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/fotos", fotoRoutes);
  }
}

export default new App().app;
