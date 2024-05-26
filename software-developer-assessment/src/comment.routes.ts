import express, { Request, Response } from 'express';
import { CommentService } from './comment.service';
import { database } from './database';
import { CommentDto } from './comment';

const router = express.Router();

const service = new CommentService(database());

/**
 * Route to create a new {@link Comment}.
 * Validates the request body to ensure required fields are present.
 * Responds with the created comment or an error message.
 */
router.post('/', async (req: Request, res: Response) => {
  const dto = req.body as CommentDto;

  if (!dto.body || !dto.email || !dto.name) {
    res.status(400).json({ message: 'name, email or body is missing' });
    return;
  }

  try {
    await service.create(dto);
    res.status(201).json({ message: 'comment posted' });
  } catch (e) {
    res.status(400).json({ message: 'error creating comment' });
  }
});

/**
 * Route to get a {@link Comment} by its ID.
 * Responds with the comment or an error message if not found.
 */
router.get('/:comment_id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.comment_id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'invalid comment Id' });
  }

  const comment = await service.commentByCommentId(id);

  if (!comment) res.status(404).json({ message: 'comment not found' });

  res.status(200).json(comment);
});

/**
 * Route to get all {@link Comment}.
 * Responds with an array of comments.
 */
router.get('/', async (req: Request, res: Response) =>
  res.status(200).json(await service.allComments()),
);

export default router;
