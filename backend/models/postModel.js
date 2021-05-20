// import connection
import pool from "../config/database.js";
 
// Get All Forum posts
export const getForumList = (result) => {
    db.query("SELECT * FROM forum", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Get comments for specific forum posts
export const getCommentList = (id, result) => {
    db.query("SELECT * FROM comment WHERE mouse_id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
    
// Insert forum post into database
export const insertForumPost = (data, result) => {
    db.query("INSERT INTO forum SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
//Insert comment post into database
export const insertCommentPost = (data, result) => {
    db.query("INSERT INTO comment SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}