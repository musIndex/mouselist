// import connection
import pool from "../config/database.js";

// Get All Forum posts
export const getForumList = async (result) => {
    try {
        const queryResults = await pool.query("SELECT * FROM forum");
        result(null, queryResults);
    }
    catch (error) {
        console.log(error);
        result(error, null);
    }
   
}

// Get comments for specific forum posts
export const getCommentList = async (id, result) => {
    try {
        const queryResults = await pool.query("SELECT * FROM comment WHERE post_id = ?", [id]);
        console.log(id, "got comment list");
        console.log(queryResults);
        result(null, queryResults);
    }
    catch (error) {
        console.log(error);
        result(error, null);
    }
    
}
//Get email from forum post
export const getForumEmail = async (id, result) => {
    try {
        const queryResults = await pool.query("SELECT email,mouse FROM forum WHERE id = ?", [id]);
        console.log(id, "got forum email");
        console.log(queryResults);
        result(null, queryResults);
    }
    catch (error) {
        console.log(error);
        result(error, null);
    }
    
}

// Insert forum post into database
export const insertForumPost = async (data, result) => {
    try {
        let dataProps = []
        for (const prop in data) {
            dataProps.push(`${prop} = '${data[prop]}'`);
        }
        
        const query = `INSERT INTO forum SET ${dataProps.join(',')}`
        const queryResults = await pool.query(query);
        result(null, queryResults);
    }
    catch (error){
        console.log(error);
        result(error, null);
    }
}

    
//Insert comment post into database
export const insertCommentPost = async (data, result) => {
    try {
        let dataProps = []
        for (const prop in data) {
            dataProps.push(`${prop} = '${data[prop]}'`);
        }
        
        const query = `INSERT INTO comment SET ${dataProps.join(',')}`
        
        const queryResults = await pool.query(query);
        
        result(null, queryResults);
        getCommentPost(queryResults(id));
       // console.log(queryResults);
    }
    catch (error){
        console.log(error);
        result(error, null);
    }   
}