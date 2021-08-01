import { sendEmailConfirmation } from "../models/email.js";
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
        console.log(req.params.id);
        console.log("got comment post request");
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
    var user = data.user_email;
    var links = data.links;
    var comment = data.user_comment;
    var forumEmail = data.email;
    var mouse = data.mouse;
    console.log('got new comment request')
    insertCommentPost(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
    
    sendEmailConfirmation(user, links, comment, forumEmail, mouse);
}
    
