import Sequelize from "sequelize";
import databaseConfig from "../configs/database.js";
import Aluno from "../models/Aluno.js";
import User from "../models/User.js";
import Foto from "../models/Foto.js";
import semear from "./seeds/index.js";

/* global process */

const models = [Aluno, User, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
// O associate só pode rodar depois que TODOS os models existem, senão um
// model tenta se ligar a outro que ainda não foi inicializado.
models.forEach((model) => {
  if (model.associate) model.associate(connection.models);
});

// Equivalente ao ddl-auto: create-drop do Spring/JPA: derruba as tabelas e
// recria zeradas a cada boot. Ligado por variável de ambiente porque APAGA
// TUDO — jamais deve ficar ligado fora do ambiente de estudo.
export async function sincronizar() {
  const forcar = process.env.DB_SYNC_FORCE === "true";

  if (!forcar) {
    await connection.authenticate();
    console.log("Banco conectado (sem recriar tabelas).");
    return;
  }

  console.log("DB_SYNC_FORCE=true → apagando e recriando todas as tabelas...");
  await connection.sync({ force: true });
  console.log("Tabelas recriadas.");

  await semear(connection.models);
}

export default connection;
