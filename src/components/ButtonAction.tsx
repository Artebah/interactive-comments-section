import React from "react";
import { Button } from "@mui/material";

interface ButtonActionProps {
  children: React.ReactNode;
  iconSrc: string;
  iconAlt: string;
  isActionDelete?: boolean;
}

export function ButtonAction({
  children,
  iconSrc,
  iconAlt,
  isActionDelete = false,
}: ButtonActionProps) {
  return (
    <Button
      sx={{
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: "1rem",
        color: isActionDelete ? "error.main" : "primary.main",
        transition: (theme) => theme.transitions.create("all"),
        ":hover": { opacity: 0.7, background: "transparent" },
      }}
      startIcon={<img src={iconSrc} alt={iconAlt} />}>
      {children}
    </Button>
  );
}
