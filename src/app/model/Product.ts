import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "src/database";
import Category from "./Category";

class Product extends Model {
  public readonly id: number;
  public category_id: number;
  public name: string;
  public description: string;
  public stars: number;
  public sales: number;
  public price: number;
  public image: string;
}

Product.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: new DataTypes.INTEGER(),
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    stars: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    sales: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    price: {
      type: new DataTypes.DECIMAL(20, 6),
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  { tableName: "categories", sequelize }
);

Product.belongsTo(Category, { foreignKey: "id", as: "category" });

export default Product;
