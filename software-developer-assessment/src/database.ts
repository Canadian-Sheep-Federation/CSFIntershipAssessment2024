import { Database } from 'sqlite3';

/**
 * Opens a connection to the SQLite database and initializes the comment table if it doesn't exist.
 * @returns A Promise that resolves to the SQLite database connection.
 */
export const database = () => {
  const connection = new Database('dummy-database.db');

  /**
   * Initializes the comment table in the database.
   * Drops the table if it exists and creates a new one.
   */
  connection.exec(`
        CREATE TABLE IF NOT EXISTS comment
        (
            comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id    INTEGER DEFAULT NULL,
            name       VARCHAR(50)  NOT NULL,
            email      VARCHAR(255) NOT NULL,
            body       VARCHAR(500) NOT NULL
        );
    `);

  return connection;
};
