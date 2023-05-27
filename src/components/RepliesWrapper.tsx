import React from "react";
import { Box, useTheme } from "@mui/material";

interface ReplyWrapperProps {
  children: React.ReactNode;
}

export function RepliesWrapper({ children }: ReplyWrapperProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderLeft: 2,
        borderColor: "#E8E9ED",
        ml: 4,
        pl: 4,
        [theme.breakpoints.down("md")]: {
          ml: 0,
          pl: 2.5,
        },
        [theme.breakpoints.down("sm")]: {
          pl: 1.5,
        },
      }}>
      {children}
    </Box>
  );
}
