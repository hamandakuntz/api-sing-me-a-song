import "../../src/setup";
import connection from "../../src/database";

export async function generateValidBodyAndPost () {
    const recommendation = {
        name: "Bad Romance - Lady Gaga",
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
        name: "Bad Romance - Lady Gaga",
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

export async function generateRecommendation() {
    const recommendation = {
        name: "Bad Romance - Lady Gaga",
        youtubeLink: "https://www.youtube.com/watch?v=qrO4YZeyl0I"
    }

    const result = await connection.query(`
    INSERT INTO recommendations
    (name, "youtubeLink", score)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [recommendation.name, recommendation.youtubeLink, 0]);

    return result.rows[0]
}

export async function generateUpvote () {   
    const result = await generateRecommendation();
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
    const result = await generateRecommendation();
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

export async function generateListOfAllRecommendations() {

    await generateValidBodyAndPost();    

    await generateValidBodyAndPost();    

    await generateValidBodyAndPost();    


    const recommendations = await connection.query(`
        SELECT * FROM recommendations    
        ORDER BY NEWID()
    `);

    console.log(recommendations)
    return recommendations.rows;
}

