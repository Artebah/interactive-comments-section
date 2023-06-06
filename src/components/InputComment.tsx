import React from "react";

import { Button, useTheme, styled } from "@mui/material";

import { UserIcon } from "./UserIcon";
import { Wrapper } from "./Wrapper";

import { IUser } from "../types/User";
import { IComment, IReply } from "../types/Comments";

import { commentsApi } from "../services/commentsService";

import { replyContext } from "./CommentLayout";

export const TextAreaComment = styled("textarea")(({ theme, sx }) =>
  theme.unstable_sx({
    fontFamily: "Rubik",
    fontSize: "1rem",
    lineHeight: 1.4,
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
    ...sx,
  })
);

interface InputCommentButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  sx?: {};
}
export const InputCommentButton = ({
  onClick,
  children,
  disabled = false,
  sx,
}: InputCommentButtonProps) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    sx={{ px: 2.5, ...sx }}
    variant="contained">
    {children}
  </Button>
);

interface InputCommentProps {
  currentUser: IUser;
  isInputReply?: boolean;
  commentObj?: IComment;
}
export function InputComment(props: InputCommentProps) {
  const { currentUser, isInputReply, commentObj } = props;

  const theme = useTheme();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const commentReplyData = React.useContext(replyContext);
  const replyButtonHandler = commentReplyData?.setIsReplyButtonClicked;

  const [addComment, { isLoading: isLoadingAddComment }] =
    commentsApi.useAddCommentMutation();
  const [addCommentReply, { isLoading: isLoadingAddCommentReply }] =
    commentsApi.useChangeCommentMutation();

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

  const handleSendingComment = async () => {
    const textAreaValue = textAreaRef.current?.value;

    if (textAreaValue) {
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
          content: textAreaValue.trim(),
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

        if (replyButtonHandler) {
          replyButtonHandler(false);
        }
      } else {
        const newComment = {
          id: 0,
          content: textAreaValue.trim(),
          createdAt: "1s ago",
          score: 0,
          user: currentUser,
          replies: [],
        };

        await addComment(newComment);

        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <Wrapper gap={2} sxExtra={{ flexWrap: "wrap" }}>
      <UserIcon
        sxExtra={{
          [theme.breakpoints.down("md")]: {
            order: 1,
            flexGrow: 1,
          },
        }}
        image={currentUser.image}
      />

      <TextAreaComment
        name="inputComment-textarea"
        ref={textAreaRef}
        placeholder="Add comment..."
      />

      <InputCommentButton
        onClick={handleSendingComment}
        disabled={isLoadingAddComment || isLoadingAddCommentReply}
        sx={{ order: 2 }}>
        {isInputReply ? "reply" : "send"}
      </InputCommentButton>
    </Wrapper>
  );
}
