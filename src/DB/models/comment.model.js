import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connectionDB.js";
import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";

export class commentModel extends Model {}

commentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: postModel,
        key: "id",
      },
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
    modelName: "Comment",
    timestamps: true,
  }
);