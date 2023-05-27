import React from "react";
import { Box } from "@mui/material";

interface CommentWrapperProps {
  children: React.ReactNode;
  gap: number;
  sxExtra?: object;
}

export function CommentWrapper({ children, gap, sxExtra }: CommentWrapperProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        bgcolor: "#fff",
        borderRadius: 2,
        padding: 2.5,
        gap: gap,
        mb: 2,
        ...sxExtra,
      }}>
      {children}
    </Box>
  );
}
