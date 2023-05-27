import { Box, Button, Typography, styled, useTheme } from "@mui/material";

const RatingButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.3, 1.4),
  lineHeight: 1,
  minWidth: 0,
  width: "100%",
  color: "#C7C4DE",
  fontSize: "1rem",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.2, 1.7),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.2, 1.2),
  },
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

interface RatingProps {
  score: number;
}
export const Rating = ({ score }: RatingProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        borderRadius: 1,
        [theme.breakpoints.down("md")]: {
          display: "flex",
          alignItems: "center",
        },
      }}>
      <RatingButton>+</RatingButton>
      <Typography
        sx={{
          display: "block",
          textAlign: "center",
          py: 0.5,
          fontWeight: 700,
          color: "primary.main",
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(0.5, 1),
          },
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.5, 0.7),
          },
        }}
        component="span">
        {score}
      </Typography>
      <RatingButton>-</RatingButton>
    </Box>
  );
};
