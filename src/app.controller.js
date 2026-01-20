import express from "express";
import { checkConnection, syncDB } from "./DB/connectionDB.js";
import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import { userModel } from "./DB/models/user.model.js";
import { postModel } from "./DB/models/post.model.js";
import { commentModel } from "./DB/models/comment.model.js";
import commentRouter from "./modules/comment/comment.controller.js";

const app = express();
const port = 3000;

const bootstrap = () => {
  app.use(express.json());

  // Define Associations
  userModel.hasMany(postModel, { foreignKey: "userId" });
  postModel.belongsTo(userModel, { foreignKey: "userId" });

  postModel.hasMany(commentModel, { foreignKey: "postId" });
  commentModel.belongsTo(postModel, { foreignKey: "postId" });

  userModel.hasMany(commentModel, { foreignKey: "userId" });
  commentModel.belongsTo(userModel, { foreignKey: "userId" });

  checkConnection();
  syncDB();

  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);


  app.use("{/*demo}", (req, res) => {
    res.status(404).json({
      message: `the URL ${req.originalUrl} not found`,
    });
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
};

export default bootstrap;
