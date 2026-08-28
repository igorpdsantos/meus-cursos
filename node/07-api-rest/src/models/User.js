import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo nome deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Este e-mail já está cadastrado.",
          },
          validate: {
            isEmail: {
              msg: "Campo e-mail é inválido.",
            },
          },
        },
        // Coluna real do banco. Nunca sai na resposta da API.
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        // VIRTUAL: existe só em memória, não vira coluna. É por aqui que a
        // senha em texto puro entra e vira hash no hook beforeSave.
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
        },
      },
      {
        sequelize,
        tableName: "users",
        // Validação de modelo: roda sempre, mesmo quando o campo não veio no
        // corpo do pedido. É isso que deixa a senha obrigatória no cadastro e
        // opcional no update (PATCH manda só o que mudou).
        validate: {
          senha() {
            if (this.isNewRecord && !this.password) {
              throw new Error("Campo senha é obrigatório.");
            }

            if (this.password && (this.password.length < 6 || this.password.length > 50)) {
              throw new Error("Campo senha deve ter entre 6 e 50 caracteres.");
            }
          },
        },
      },
    );

    // beforeSave roda no create e no update: a senha nunca é gravada em texto.
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, {
      foreignKey: "user_id",
      as: "fotos",
      onDelete: "CASCADE",
    });
  }

  // Compara a senha digitada no login com o hash guardado.
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
