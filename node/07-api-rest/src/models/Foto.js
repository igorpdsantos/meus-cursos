import Sequelize, { Model } from "sequelize";

/* global process */

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo originalname não pode ficar vazio.",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo filename não pode ficar vazio.",
            },
          },
        },
        // Campo calculado na leitura: o cliente recebe a URL pronta, não o
        // nome do arquivo no disco.
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const base = process.env.APP_URL || "http://localhost:3001";
            return `${base}/uploads/${this.getDataValue("filename")}`;
          },
        },
      },
      {
        sequelize,
        tableName: "fotos",
        // Uma foto pertence a um aluno OU a um usuário — nunca aos dois, nunca
        // a nenhum. As duas FKs são opcionais no banco; a regra mora aqui.
        validate: {
          donoUnico() {
            if (!this.aluno_id && !this.user_id) {
              throw new Error("A foto precisa pertencer a um aluno ou a um usuário.");
            }

            if (this.aluno_id && this.user_id) {
              throw new Error("A foto não pode pertencer a um aluno e a um usuário ao mesmo tempo.");
            }
          },
        },
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id", as: "aluno" });
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}
