import "../../src/setup";
import connection from "../../src/database";

export async function generateValidBodyAndPost () {
    const recommendation = {
        name: "Test Music",
        youtubeLink: "https://www.youtube.com/watch?v=qrO4YZeyl0I"
    }

    const result = await connection.query(`
    INSERT INTO recommendations
    (name, "youtubeLink", score)
    VALUES ($1, $2, $3)
    RETURNING name, "youtubeLink"
    `, [recommendation.name, recommendation.youtubeLink, 0]);
  
    return result.rows[0];
}

export async function generateInvalidBodyAndPost () {
    const recommendation = {
        name: "Test Music",
        youtubeLink: "https://www.lala.com/watch?v=qrO4YZeyl0I"
    }

    const result = await connection.query(`
    INSERT INTO recommendations
    (name, "youtubeLink", score)
    VALUES ($1, $2, $3)
    RETURNING name, "youtubeLink"
    `, [recommendation.name, recommendation.youtubeLink, 0]);
  
    return result.rows[0];
}

export async function generateRecommendation(score: number) {
    const recommendation = {
        name: "Test Music",
        youtubeLink: "https://www.youtube.com/"
    }

    const result = await connection.query(`
    INSERT INTO recommendations
    (name, "youtubeLink", score)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [recommendation.name, recommendation.youtubeLink, score]);

    return result.rows[0]
}

export async function generateUpvote () {   
    const result = await generateRecommendation(3);
    const score = result.score;    
    let newScore = score+1; 
    
    const upvote = await connection.query(`
    UPDATE recommendations
    SET score = $1 
    WHERE id = $2
    RETURNING id
    `, [newScore, result.id]);
  
    return upvote.rows[0];
}


export async function generateDownvote () {   
    const result = await generateRecommendation(3);
    const score = result.score;    
    let newScore = score-1; 
    
    const upvote = await connection.query(`
    UPDATE recommendations
    SET score = $1 
    WHERE id = $2
    RETURNING id
    `, [newScore, result.id]);
  
    return upvote.rows[0];
}

export async function generateMusicRecommendation() {

    await generateValidBodyAndPost();    

    await generateValidBodyAndPost();    

    await generateValidBodyAndPost();    


    const recommendations = await connection.query(`
        SELECT * FROM recommendations         
        ORDER BY RANDOM()
        LIMIT 1 
    `);

    return recommendations.rows[0];
}

export async function checkTheRecommendationsTable() {
    const response = await connection.query(`SELECT COUNT(*) AS RowCnt
    FROM recommendations`);

    return response.rowCount;
}

export async function getTopRecommendations() {

    await generateRecommendation(3);
    await generateRecommendation(4);
    await generateRecommendation(5);   

    const getTopRecommendations = await connection.query(`
    SELECT * FROM recommendations
    ORDER BY score DESC LIMIT $1`, [3]);

    return getTopRecommendations.rows;     
}