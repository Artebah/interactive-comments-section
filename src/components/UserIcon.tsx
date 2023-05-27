import React from "react";
import { Box } from "@mui/material";
import { IUserImage } from "../types/User";

interface UserIconProps {
  image: IUserImage;
  sxExtra?: object;
}

export function UserIcon({ image, sxExtra }: UserIconProps) {
  return (
    <Box
      component="picture"
      sx={{
        display: "flex",
        alignItems: "center",
        img: {
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "#333",
        },
        ...sxExtra,
      }}>
      <source type="image/webp" srcSet={image.webp} />
      <img src={image.png} alt="user" />
    </Box>
  );
}
