
// import express
import express from "express";

// import function from controller
import { showForumPost, showCommentPost, createForumPost, createCommentPost } from "../controllers/forumPosts.js";

// init express router
const router = express.Router();

// Get All forum posts
router.get('/api/forum', showForumPost);

// Get comment posts for specific forum post
router.get('/api/posts/:id', showCommentPost);

// Create New Forum Post
router.post('/api/forumPost', createForumPost);

// Create New Comment Post
router.post('/api/commentPost', createCommentPost);


// export default router
export default router;