import React from "react";
import { Button, useTheme } from "@mui/material";

interface ButtonActionProps {
  children: React.ReactNode;
  iconSrc: string;
  iconAlt: string;
  isActionDelete?: boolean;
  onClick?: () => void;
}
export function ButtonAction(props: ButtonActionProps) {
  const { children, iconSrc, iconAlt, isActionDelete = false, onClick } = props;
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: "1rem",
        color: isActionDelete ? "error.main" : "primary.main",
        transition: (theme) => theme.transitions.create("all"),
        ":hover": { opacity: 0.7, background: "transparent" },
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.875rem",
        },
      }}
      startIcon={<img src={iconSrc} alt={iconAlt} />}>
      {children}
    </Button>
  );
}
