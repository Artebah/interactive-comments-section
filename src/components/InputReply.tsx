import React from "react";
import { Box, Button } from "@mui/material";
import { UserIcon } from "./UserIcon";
import { CommentWrapper } from "./CommentWrapper";
import { IUser } from "../types/User";

interface InputReplyProps {
  currentUser: IUser;
}
export function InputReply({ currentUser }: InputReplyProps) {
  return (
    <CommentWrapper gap={2}>
      <UserIcon image={currentUser.image} />
      <Box
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
        }}
        placeholder="Add a comment..."
        component="textarea"></Box>
      <Button sx={{ px: 2.5 }} variant="contained">
        send
      </Button>
    </CommentWrapper>
  );
}
