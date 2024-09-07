// import connection
import pool from "../config/database.js";

// Get All Forum posts
export const getForumList = async (result) => {
    try {
         const queryResults = await pool.query('SELECT * from forum');
         //result(null, queryResults);
         result(null, queryResults[0]);
    
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
        console.log(queryResults[0]);
        result(null, queryResults[0]);
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
        console.log(queryResults);
    }
    catch (error){
        console.log(error);
        result(error, null);
    }   
}