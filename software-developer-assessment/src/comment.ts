export interface Comment {
  post_id: number;
  comment_id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentDto {
  name: string;
  email: string;
  body: string;
}

export const API_PREFIX = '/api/v1/';
