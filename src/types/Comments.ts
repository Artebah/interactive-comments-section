import { IUser } from "./User";

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies: IReply[];
}

export type IReply = Omit<IComment, "replies"> & {
  replyingTo: string;
};
