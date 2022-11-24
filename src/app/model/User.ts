import { Model, DataTypes } from "sequelize";
import sequelize from "src/database";

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare birth: string;
  declare phone: string;
  declare image: string;
}

User.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    password: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    birth: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    phone: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default User;
