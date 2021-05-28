import { getForumList, getCommentList, insertForumPost, insertCommentPost } from "../models/postModel.js";
 
// Get forum post
export const showForumPost = (req, res) => {
    console.log('got request')
    getForumList((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Get comment posts for specific mouse post
export const showCommentPost = (req, res) => {
    getCommentList(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Create new forum post
export const createForumPost = (req, res) => {
    const data = req.body;
    console.log('got new post request')
    insertForumPost(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create new comment post
export const createCommentPost = (req, res) => {
    const data = req.body;
    insertCommentPost(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}