import React from "react";
import { Box } from "@mui/material";

interface UserIconProps {
  src: string;
}

export function UserIcon({ src }: UserIconProps) {
  return (
    <Box
      component="span"
      sx={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "#333",
      }}>
      <img src={src} alt="user" />
    </Box>
  );
}
