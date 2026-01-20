import { commentModel } from "../../DB/models/comment.model.js";
import { userModel } from "../../DB/models/user.model.js";
import { postModel } from "../../DB/models/post.model.js";
import { Op } from "sequelize";

export const createBulkComment = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Input must be an array of comments" });
    }
    const comments = await commentModel.bulkCreate(req.body, { validate: true });
    // console.log("comments@@@@@@@@@@@@@", comments);
    return res
      .status(201)
      .json({ message: "Comments created successfully", comments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating comments", error: error.message });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;
    const comment = await commentModel.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }
    await comment.update({ content });
    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const [comment, created] = await commentModel.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content },
    });

    if (created) {
      return res.status(201).json({ message: "Comment created successfully", comment });
    }
    return res.status(200).json({ message: "Comment already exists", comment });
  } catch (error) {
    return res.status(500).json({ message: "Error in find or create comment", error: error.message });
  }
};

export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;
    if (!word) {
      return res.status(400).json({ message: "Search word is required" });
    }
    const { count, rows } = await commentModel.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });
    if (count === 0) {
      return res.status(404).json({ message: "No comments found" });
    }
    return res.status(200).json({ message: "success", count, comments: rows });
  } catch (error) {
    return res.status(500).json({ message: "Error searching comments", error: error.message });
  }
};

export const getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentModel.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    return res.status(200).json({ message: "success", comments });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching newest comments", error: error.message });
  }
};

export const getCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.findByPk(id, {
      include: [userModel, postModel],
    });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    return res.status(200).json({ message: "success", comment });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comment details", error: error.message });
  }
};
