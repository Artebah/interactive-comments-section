import React from "react";

import { Box, Button, useTheme } from "@mui/material";

import { UserIcon } from "./UserIcon";
import { CommentWrapper } from "./CommentWrapper";

import { IUser } from "../types/User";
import { IComment, IReply } from "../types/Comments";

import { commentsApi } from "../services/commentsService";

import { commentReplyDataContext } from "./comment/Comment";

interface InputCommentProps {
  currentUser: IUser;
  isInputReply?: boolean;
  commentObj?: IComment;
}
export function InputComment(props: InputCommentProps) {
  const { currentUser, isInputReply, commentObj } = props;

  const theme = useTheme();
  const textAreaRef = React.useRef<HTMLTextAreaElement>();

  const commentReplyData = React.useContext(commentReplyDataContext);
  const replyButtonHandler = commentReplyData?.setIsReplyButtonClicked;

  const [addComment, { isLoading: isLoadingAddComment }] =
    commentsApi.useAddCommentMutation();
  const [addCommentReply, { isLoading: isLoadingAddCommentReply }] =
    commentsApi.useAddCommentReplyMutation();

  React.useEffect(() => {
    if (isInputReply) {
      const textArea = textAreaRef.current;

      if (textArea) {
        if (commentObj) {
          const username = commentObj.user.username;
          textArea.defaultValue = "@" + username + ", ";
        }

        textArea.focus();
        textArea.selectionStart = textArea.value.length;
      }
    }
  }, [commentObj, isInputReply]);

  /* ====================================================== */
  const handleSendingComment = async () => {
    const textArea = textAreaRef?.current;

    if (textArea) {
      if (isInputReply && commentObj) {
        const replies = commentObj.replies;
        const lastReply = replies[replies.length - 1];

        let replyId;

        if (replies.length && lastReply.id) {
          replyId = lastReply.id + 1;
        } else {
          replyId = 1;
        }

        const newReply: IReply = {
          id: replyId,
          content: textArea.value,
          createdAt: "1s ago",
          replyingTo: commentObj.user.username,
          score: 0,
          user: currentUser,
        };

        const replyingToMark = `@${newReply.replyingTo},`;
        const content = newReply.content;
        if (content.includes(replyingToMark)) {
          newReply.content = newReply.content.slice(replyingToMark.length).trim();
        }

        await addCommentReply({
          ...commentObj,
          replies: [...replies, newReply],
        });

        replyButtonHandler(false);
      } else {
        const newComment: IComment = {
          content: textArea.value,
          createdAt: "1s ago",
          score: 0,
          user: currentUser,
          replies: [],
        };

        await addComment(newComment);

        textArea.value = "";
      }
    }
  };
  /* ====================================================== */

  return (
    <CommentWrapper gap={2} sxExtra={{ flexWrap: "wrap", alignItems: "center" }}>
      <UserIcon
        sxExtra={{
          [theme.breakpoints.down("md")]: {
            order: 1,
            flexGrow: 1,
          },
        }}
        image={currentUser.image}
      />
      <Box
        ref={textAreaRef}
        sx={{
          fontFamily: "Rubik",
          fontSize: "0.9375rem",
          resize: "none",
          px: 2,
          py: 1.5,
          flexGrow: 1,
          height: 90,
          borderColor: "#EBEBEB",
          borderRadius: 1,
          [theme.breakpoints.down("md")]: {
            p: 1,
            order: 0,
            minWidth: "100%",
          },
        }}
        placeholder="Add a comment..."
        component="textarea"
      />

      <Button
        disabled={isLoadingAddComment || isLoadingAddCommentReply}
        onClick={handleSendingComment}
        sx={{ px: 2.5, order: 2 }}
        variant="contained">
        {isInputReply ? "reply" : "send"}
      </Button>
    </CommentWrapper>
  );
}
