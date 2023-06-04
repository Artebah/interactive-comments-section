import React from "react";
import { Box, useTheme } from "@mui/material";

import { Wrapper } from "./Wrapper";
import { ContentTop } from "./comment/ContentTop";
import { ContentBottom } from "./comment/ContentBottom";
import { Rating } from "./comment/Rating";
import { InputComment } from "./InputComment";

import { IComment, IReply } from "../types/Comments";
import { IUser } from "../types/User";

/* contexts */
interface ReplyContextType {
  isReplyButtonClicked: boolean;
  setIsReplyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
export const replyContext = React.createContext<ReplyContextType | null>(null);
// ========================================================================================
interface RatingContextType {
  comment: IComment & {
    replyId?: number;
  };
  parentComment: IComment;
}
export const ratingContext = React.createContext<RatingContextType | null>(null);
// ========================================================================================
interface EditContextType {
  isEditButtonClicked: boolean;
  setIsEditButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  commentObj: IComment & { replyId: number };
  parentComment: IComment;
}
export const editContext = React.createContext<EditContextType | null>(null);
/* contexts */

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
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false);

  const theme = useTheme();

  const commentObj = {
    content,
    createdAt,
    score,
    user,
    replies,
    id: commentId,
  };

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
          value={
            {
              comment: { ...commentObj, replyId },
              parentComment,
            } as RatingContextType
          }>
          <Rating score={score} />
        </ratingContext.Provider>
        <Box sx={{ flexGrow: 1, width: 1 }}>
          <editContext.Provider
            value={
              {
                isEditButtonClicked,
                setIsEditButtonClicked,
                commentObj: { ...commentObj, replyId },
                parentComment,
              } as EditContextType
            }>
            <ContentTop user={user} createdAt={createdAt} currentUser={currentUser} />
            <ContentBottom content={content} replyingTo={replyingTo} />
          </editContext.Provider>
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
