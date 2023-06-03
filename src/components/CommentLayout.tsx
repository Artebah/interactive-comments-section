import React from "react";
import { Box, useTheme } from "@mui/material";

import { Wrapper } from "./Wrapper";
import { ContentTop } from "./comment/ContentTop";
import { ContentBottom } from "./comment/ContentBottom";
import { Rating } from "./comment/Rating";
import { InputComment } from "./InputComment";

import { IComment, IReply } from "../types/Comments";
import { IUser } from "../types/User";

interface ReplyContextType {
  isReplyButtonClicked: boolean;
  setIsReplyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
export const replyContext = React.createContext<ReplyContextType | null>(null);

interface RatingContextType {
  comment: IComment & {
    replyId?: number;
  };
  parentComment: IComment;
}
export const ratingContext = React.createContext<RatingContextType | null>(null);

type CommentLayoutProps = Omit<IComment, "replies" | "id"> & {
  commentId: number;
  currentUser: IUser;
  replies?: IReply[];
  replyingTo?: string;
  replyId?: number;
  parentComment?: IComment;
};
export function CommentLayout(props: CommentLayoutProps) {
  const {
    content,
    createdAt,
    score,
    user,
    currentUser,
    commentId,
    replies,
    replyId,
    replyingTo,
    parentComment,
  } = props;

  const [isReplyButtonClicked, setIsReplyButtonClicked] = React.useState(false);
  const theme = useTheme();

  let commentObj;
  if (!replyId) {
    commentObj = {
      content,
      createdAt,
      score,
      user,
      replies,
      id: commentId,
    };
  } else {
    commentObj = {
      content,
      createdAt,
      score,
      user,
      replies,
      id: commentId, // якщо треба, то додати в об'єкт replyId
    };
  }

  return (
    <replyContext.Provider
      value={{
        isReplyButtonClicked,
        setIsReplyButtonClicked,
      }}>
      <Wrapper
        gap={3}
        sxExtra={{
          [theme.breakpoints.down("md")]: {
            flexDirection: "column-reverse",
            position: "relative",
          },
        }}>
        <ratingContext.Provider
          value={{
            comment: { ...commentObj, replyId } as IComment & { replyId: number },
            parentComment: parentComment as IComment,
          }}>
          <Rating score={score} />
        </ratingContext.Provider>
        <Box sx={{ flexGrow: 1 }}>
          <ContentTop user={user} createdAt={createdAt} currentUser={currentUser} />
          <ContentBottom content={content} replyingTo={replyingTo} />
        </Box>
      </Wrapper>
      {isReplyButtonClicked && (
        <InputComment
          currentUser={currentUser}
          isInputReply
          commentObj={commentObj as IComment}
        />
      )}
    </replyContext.Provider>
  );
}
