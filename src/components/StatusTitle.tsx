import React from "react";
import { Typography } from "@mui/material";

interface StatusTitleProps {
  children: React.ReactNode;
}
export function StatusTitle({ children }: StatusTitleProps) {
  return <Typography variant="h4">{children}</Typography>;
}
