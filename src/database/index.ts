import { Sequelize } from "sequelize";
import dbConfig from "@config/database";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

export default sequelize;
