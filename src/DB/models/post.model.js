import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connectionDB.js";
import { userModel } from "./user.model.js";

export class postModel extends Model {}

postModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true, // Adds createdAt and updatedAt
    paranoid: true,   // Adds deletedAt and enables soft-delete behavior
  }
);