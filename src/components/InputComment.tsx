import React from "react";

import { Box, Button, useTheme } from "@mui/material";

import { UserIcon } from "./UserIcon";
import { CommentWrapper } from "./CommentWrapper";

import { IUser } from "../types/User";

import { commentsApi } from "../services/commentsService";

interface InputInputCommentProps {
  currentUser: IUser;
  isInputReply?: boolean;
}
export function InputComment({ currentUser, isInputReply }: InputInputCommentProps) {
  const theme = useTheme();
  const [addComment, { isLoading }] = commentsApi.useAddCommentMutation();
  const textAreaRef = React.useRef<HTMLTextAreaElement>();

  const handleSendingComment = async () => {
    const textAreaValue = textAreaRef?.current?.value;
    if (textAreaValue) {
      await addComment({
        content: textAreaValue,
        createdAt: "1s ago",
        score: 0,
        user: currentUser,
        replyingTo: undefined,
        replies: [],
      });
    }
  };

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
        component="textarea"></Box>
      <Button
        disabled={isLoading}
        onClick={handleSendingComment}
        sx={{ px: 2.5, order: 2 }}
        variant="contained">
        {isInputReply ? "reply" : "send"}
      </Button>
    </CommentWrapper>
  );
}
