import React from "react";
import { Box } from "@mui/material";
import { IUserImage } from "../types/User";

interface UserIconProps {
  image: IUserImage;
}

export function UserIcon({ image }: UserIconProps) {
  return (
    <Box
      component="picture"
      sx={{
        img: {
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "#333",
        },
      }}>
      <source type="image/webp" srcSet={image.webp} />
      <img src={image.png} alt="user" />
    </Box>
  );
}
