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
    console.log(getScore.rows[0].score)
    return getScore.rows[0].score;
}

export async function upvote (id: number, newScore: number) {
    const upvote = await connection.query(`
    UPDATE recommendations
    SET score = $1 
    WHERE id = $2
    `, [newScore, id]);
  
    return upvote.rows;
}

