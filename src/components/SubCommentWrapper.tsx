import React from "react";
import { Box } from "@mui/material";

interface SubCommentWrapperProps {
  children: React.ReactNode;
}

export function SubCommentWrapper({ children }: SubCommentWrapperProps) {
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
