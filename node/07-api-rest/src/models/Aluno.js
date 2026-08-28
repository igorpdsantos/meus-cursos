import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
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
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo sobrenome deve ter entre 3 e 255 caracteres.",
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
        idade: {
          type: Sequelize.INTEGER,
          // Numérico não aceita "" como default no banco: a obrigatoriedade
          // vem de allowNull + notNull, não de um valor padrão vazio.
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo idade é obrigatório.",
            },
            isInt: {
              msg: "Campo idade precisa ser um número inteiro.",
            },
          },
        },
        peso: {
          type: Sequelize.FLOAT,
          // Numérico não aceita "" como default no banco: a obrigatoriedade
          // vem de allowNull + notNull, não de um valor padrão vazio.
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo peso é obrigatório.",
            },
            isFloat: {
              msg: "Campo peso precisa ser um número.",
            },
          },
        },
        altura: {
          type: Sequelize.FLOAT,
          // Numérico não aceita "" como default no banco: a obrigatoriedade
          // vem de allowNull + notNull, não de um valor padrão vazio.
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo altura é obrigatório.",
            },
            isFloat: {
              msg: "Campo altura precisa ser um número.",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "alunos",
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, {
      foreignKey: "aluno_id",
      as: "fotos",
      onDelete: "CASCADE",
    });
  }
}
