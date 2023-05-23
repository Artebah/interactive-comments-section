import { IUser } from "./User";

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replyingTo?: string;
  replies: IComment[];
}
