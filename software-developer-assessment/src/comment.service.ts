import { Database } from 'sqlite3';
import { Comment, CommentDto } from './comment';

/**
 * Service class for handling comment-related operations.
 */
export class CommentService {
  constructor(private readonly db: Database) {}

  /**
   * Creates a new {@link Comment}.
   *
   * @param dto - Data transfer object containing the details of the comment to be created.
   * @returns The created {@link Comment}.
   * @throws An error if the {@link Comment} creation fails.
   */
  async create(dto: CommentDto): Promise<void> {
    const query = `INSERT INTO comment (name, email, body) VALUES (?, ?, ?)`;
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        query,
        [dto.name.trim(), dto.email.trim(), dto.body.trim()],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  /**
   * Retrieves a {@link Comment} by its unique identifier ID.
   *
   * @param id - The ID of the comment to retrieve.
   * @returns The {@link Comment} with the specified ID, or undefined if no such comment exists.
   */
  async commentByCommentId(id: number): Promise<Comment | undefined> {
    return new Promise<Comment | undefined>((resolve, reject) => {
      this.db.get(
        `SELECT * FROM comment WHERE comment_id = ?`,
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row as Comment | undefined);
          }
        },
      );
    });
  }

  /**
   * Retrieves all comments.
   *
   * @returns An array of all {@link Comment}s.
   */
  async allComments(): Promise<Comment[]> {
    return new Promise<Comment[]>((resolve, reject) => {
      this.db.all(`SELECT * FROM comment`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Comment[]);
        }
      });
    });
  }
}
