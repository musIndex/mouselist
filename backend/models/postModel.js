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
export const insertForumPost = async (data, result) => {
    try {
        let dataProps = []
        for (const prop in data) {
            dataProps.push(`${prop} = '${data[prop]}'`);
        }
        
        const query = `INSERT INTO forum SET ${dataProps.join(',')}`
        console.log(query);
        const queryResults = await pool.query(query);
        console.log(data);
        result(null, queryResults);
        console.log(queryResults);
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
        console.log(query);
        
        const queryResults = await pool.query(query);
        
        result(null, queryResults);
       // console.log(queryResults);
    }
    catch (error){
        console.log(error);
        result(error, null);
    }   
}