import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { editContext } from "../CommentLayout";
import { InputCommentButton, TextAreaComment } from "../InputComment";

import { IComment } from "../../types/Comments";

import { commentsApi } from "../../services/commentsService";

interface ReplyingToButtonProps {
  replyingTo: string;
}
const ReplyingToButton = ({ replyingTo }: ReplyingToButtonProps) => {
  return (
    <Button
      sx={{
        p: 0,
        pb: 0.2,
        textTransform: "lowercase",
        fontSize: "1rem",
        fontWeight: 700,
        mr: 0.5,
      }}>
      @{replyingTo}
    </Button>
  );
};

interface ContentBottomProps {
  content: string;
  replyingTo?: string;
}
export const ContentBottom = ({ content, replyingTo }: ContentBottomProps) => {
  const editData = React.useContext(editContext);
  const isEditButtonClicked = editData?.isEditButtonClicked;
  const setIsEditButtonClicked = editData?.setIsEditButtonClicked;
  const commentObj = editData?.commentObj;
  const parentComment = editData?.parentComment;

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [updateComment, { isLoading: isloadingUpdateComment }] =
    commentsApi.useChangeCommentMutation();

  const updateButtonHandle = () => {
    const textAreaValue = textAreaRef.current?.value;

    if (textAreaValue) {
      if (setIsEditButtonClicked && commentObj) {
        let newComment: IComment;

        if (parentComment) {
          newComment = structuredClone(parentComment);
          newComment.replies[commentObj.replyId - 1].content = textAreaValue.trim();

          updateComment(newComment);
        } else {
          newComment = structuredClone(commentObj);
          newComment.content = textAreaValue.trim();

          updateComment(newComment);
        }
        setIsEditButtonClicked(false);
      }
    }
  };

  if (isEditButtonClicked) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 1,
            md: 2,
          },
        }}>
        <TextAreaComment ref={textAreaRef} defaultValue={content} sx={{ height: 110 }} />
        <InputCommentButton
          sx={{ alignSelf: "flex-end" }}
          onClick={updateButtonHandle}
          disabled={isloadingUpdateComment}>
          update
        </InputCommentButton>
      </Box>
    );
  } else {
    return (
      <Typography
        sx={{
          color: "text.secondary",
          pr: 4,
        }}>
        {replyingTo && <ReplyingToButton replyingTo={replyingTo} />}
        {content}
      </Typography>
    );
  }
};
