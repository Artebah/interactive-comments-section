import React from "react";

import { Box, useTheme } from "@mui/material";

import { IComment, IReply } from "../../types/Comments";
import { IUser } from "../../types/User";

import { CommentWrapper } from "../CommentWrapper";
import { ContentTop } from "./ContentTop";
import { ContentBottom } from "./ContentBottom";
import { Rating } from "./Rating";
import { InputComment } from "../InputComment";

interface CommentReplyDataContextType {
  setIsReplyButtonClicked: any;
  isReplyButtonClicked: boolean;
}
export const commentReplyDataContext =
  React.createContext<CommentReplyDataContextType | null>(null);

type CommentProps = Omit<IComment, "replies"> & {
  currentUser: IUser;
  isReply?: boolean;
  parentComment?: IComment;
  replies?: IReply[];
  replyingTo?: string;
};
export function Comment(props: CommentProps) {
  const theme = useTheme();
  const { currentUser, isReply, parentComment, replyingTo, ...comment } = props;
  const { content, createdAt, score, user } = comment;

  const [isReplyButtonClicked, setIsReplyButtonClicked] = React.useState(false);

  let commentObj: IComment;
  if (isReply && parentComment) {
    commentObj = {
      ...parentComment,
      user: comment.user,
    };
  } else {
    commentObj = comment as IComment;
  }

  return (
    <commentReplyDataContext.Provider
      value={{
        isReplyButtonClicked,
        setIsReplyButtonClicked,
      }}>
      <CommentWrapper
        gap={3}
        sxExtra={{
          [theme.breakpoints.down("md")]: {
            flexDirection: "column-reverse",
            position: "relative",
          },
        }}>
        <Rating score={score} />
        <Box sx={{ flexGrow: 1 }}>
          <ContentTop user={user} createdAt={createdAt} currentUser={currentUser} />
          <ContentBottom content={content} replyingTo={replyingTo} />
        </Box>
      </CommentWrapper>
      {isReplyButtonClicked && (
        <InputComment currentUser={currentUser} isInputReply commentObj={commentObj} />
      )}
    </commentReplyDataContext.Provider>
  );
}
