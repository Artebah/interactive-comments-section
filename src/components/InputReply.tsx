import React from "react";

import { Box, Button, useTheme } from "@mui/material";

import { UserIcon } from "./UserIcon";
import { CommentWrapper } from "./CommentWrapper";

import { IUser } from "../types/User";

interface InputReplyProps {
  currentUser: IUser;
}
export function InputReply({ currentUser }: InputReplyProps) {
  const theme = useTheme();

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
      <Button sx={{ px: 2.5, order: 2 }} variant="contained">
        send
      </Button>
    </CommentWrapper>
  );
}
