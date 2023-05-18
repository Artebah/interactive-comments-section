import React from "react";
import { Box, Button } from "@mui/material";
import { UserIcon } from "./UserIcon";
import { CommentWrapper } from "./CommentWrapper";

export function InputReply() {
  return (
    <CommentWrapper gap={2}>
      <UserIcon src="#" />
      <Box
        sx={{
          fontFamily: "Rubik",
          resize: "none",
          px: 2,
          py: 1.5,
          flexGrow: 1,
          height: 70,
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
