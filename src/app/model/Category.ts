import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "src/database";
import Product from "./Product";

class Category extends Model {
  public readonly id: number;
  public name: string;
}

Category.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  { tableName: "categories", sequelize }
);

// Category.hasMany(sequelize.models.Product, {});

export default Category;
