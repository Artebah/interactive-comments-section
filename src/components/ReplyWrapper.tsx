import React from "react";
import { Box } from "@mui/material";

interface ReplyWrapperProps {
  children: React.ReactNode;
}

export function ReplyWrapper({ children }: ReplyWrapperProps) {
  return (
    <Box
      sx={{
        borderLeft: 2,
        borderColor: "#E8E9ED",
        ml: 4,
        pl: 4,
      }}>
      {children}
    </Box>
  );
}
