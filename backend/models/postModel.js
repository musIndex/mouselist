// import connection
import pool from "../config/database.js";

// Get All Forum posts
export const getForumList = async (result) => {
    try {
        const queryResults = await pool.query("SELECT * FROM forum");
        console.log(queryResults);
        result(null, queryResults);
    }
    catch (error) {
        console.log(error);
        result(error, null);
    }
    // pool.query("SELECT * FROM forum", (err, results) => {             
    //     if(err) {
    //         console.log(err);
    //         result(err, null);
    //     } else {
    //         result(null, results);
    //     }
    // });   
}

// Get comments for specific forum posts
export const getCommentList = async (id, result) => {
    try {
        const queryResults = await pool.query("SELECT * FROM comment WHERE mouse_id = ?", [id]);
        result(null, queryResults);
    }
    catch (error) {
        console.log(error);
        result(error, null);
    }
    
}

// Insert forum post into database
export const insertForumPost = (data, result) => {
    pool.query('INSERT INTO forum SET ?', [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
//Insert comment post into database
export const insertCommentPost = (data, result) => {
    pool.query("INSERT INTO comment SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}