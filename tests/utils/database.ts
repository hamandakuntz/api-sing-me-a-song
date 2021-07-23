import connection from "../../src/database";

export async function cleanDatabase() {
    await connection.query(`TRUNCATE recommendations RESTART IDENTITY`);
}

export function endDatabaseConnection() {
    connection.end();
}