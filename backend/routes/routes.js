
// import express
import express from "express";
 
// import function from controller
import { showForumPost, showCommentPost, createForumPost, createCommentPost} from "../controllers/forumPosts.js";
 
// init express router
const router = express.Router();
 
// Get All forum posts
router.get('/forum', showForumPost);
 
// Get comment posts for specific forum post
router.get('/comment/:id', showCommentPost);
 
// Create New Forum Post
router.post('/forumPost', createForumPost);

// Create New Comment Post
router.post('/commentPost/', createCommentPost);
 
 
// export default router
export default router;