import React from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";

interface DeleteButtonProps {
  children: React.ReactNode;
  isRed?: boolean;
  onClick: () => void;
}
const DeleteButton = ({ children, isRed, onClick }: DeleteButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: isRed ? "error.main" : "text.secondary",
        color: "#fff",
        py: 1,
        px: 3,
        borderRadius: 2,
        [theme.breakpoints.down("md")]: {
          px: 2,
        },
        ":hover": {
          bgcolor: isRed ? "#ED787C" : "#838996",
        },
      }}>
      {children}
    </Button>
  );
};

interface DeletePopupProps {
  isOpen: boolean;
  onClose: any;
}
export function DeletePopup({ isOpen, onClose }: DeletePopupProps) {
  const theme = useTheme();

  const buttonCancelHandle = () => {
    onClose();
  };
  const buttonSubmitHandle = () => {
    // відправка запиту на видалення
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          bgcolor: "#fff",
          borderRadius: 2,
          width: 320,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          [theme.breakpoints.down("sm")]: {
            width: 290,
          },
        }}>
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            mb: 1.6,
            [theme.breakpoints.down("md")]: {
              fontSize: "18px",
            },
          }}>
          Delete comment
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            mb: 2,
            fontSize: "14px",
          }}>
          Are you sure you want to delete this comment? This will remove the comment and
          can't be undone.
        </Typography>
        <Box sx={{ display: "flex", gap: 1.4 }}>
          <DeleteButton onClick={buttonCancelHandle}>no, cancel</DeleteButton>
          <DeleteButton onClick={buttonSubmitHandle} isRed>
            yes, delete
          </DeleteButton>
        </Box>
      </Box>
    </Modal>
  );
}
