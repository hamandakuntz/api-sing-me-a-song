import connection from "../database";

export async function insertRecommendation (name: string, youtubeLink: string) {
  const recommendation = await connection.query(`
  INSERT INTO recommendations
  (name, "youtubeLink", score)
  VALUES ($1, $2, $3)
  `, [name, youtubeLink, 0]);

  return recommendation.rows;
}

export async function getScore (id: number) {
    const getScore = await connection.query(`SELECT * FROM recommendations WHERE id = $1`, [id]);
    return getScore.rows[0].score;
}

export async function upvote (id: number, newScore: number) {
    const upvote = await connection.query(`
    UPDATE recommendations
    SET score = $1 
    WHERE id = $2
    RETURNING *
    `, [newScore, id]);
  
    return upvote.rows[0];
}

export async function downvote (id: number, newScore: number) {
    const downvote = await connection.query(`
    UPDATE recommendations
    SET score = $1 
    WHERE id = $2
    RETURNING *
    `, [newScore, id]);
  
    return downvote.rows[0];
}

export async function deleteRecommendation (id: number) {
    const deleted = await connection.query(`
    DELETE FROM recommendations    
    WHERE id = $1
    `, [id]);
  
    return deleted.rows;
}

export async function getRecommendationsPercent (percent?: number) {
    let recommendations = null;

    if (percent === 70) {
        recommendations = await connection.query(`
            SELECT * FROM recommendations    
            WHERE score > 10            
        `);
        } else if(percent === 30) {
        recommendations = await connection.query(`
            SELECT * FROM recommendations  
            WHERE score BETWEEN -5 AND 10                  
        `);
    } else {
        recommendations = await connection.query(`
            SELECT * FROM recommendations    
            ORDER BY NEWID()
        `);
    }
  
    return recommendations.rows;
}

export async function checkTheRecommendationsTable() {
    const response = await connection.query(`SELECT COUNT(*) AS RowCnt
    FROM recommendations`);

    return response.rowCount;
}

export async function getTopRecommendations (amount: number) {
    const getTopRecommendations = await connection.query(`
    SELECT * FROM recommendations
    ORDER BY score DESC LIMIT $1`, [amount]);

    return getTopRecommendations.rows;
}