
import { Router } from "express";
import {
    createBulkComment,
    updateCommentById,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails
} from "./comment.service.js";
const commentRouter = Router();

commentRouter.post("/", createBulkComment);
commentRouter.patch("/:commentId", updateCommentById);
commentRouter.post("/find-or-create", findOrCreateComment);
commentRouter.get("/search", searchComments);
commentRouter.get("/newest/:postId", getNewestComments);
commentRouter.get("/details/:id", getCommentDetails);

export default commentRouter;