import { Box, Button, Typography, styled } from "@mui/material";

const RatingButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.3, 1.4),
  lineHeight: 1,
  minWidth: 0,
  width: "100%",
  color: "#C7C4DE",
  fontSize: "1rem",
  fontWeight: 700,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

interface RatingProps {
  score: number;
}
export const Rating = ({ score }: RatingProps) => {
  return (
    <Box sx={{ bgcolor: "secondary.main", borderRadius: 1 }}>
      <RatingButton>+</RatingButton>
      <Typography
        sx={{
          display: "block",
          textAlign: "center",
          py: 0.5,
          fontWeight: 700,
          color: "primary.main",
        }}
        component="span">
        {score}
      </Typography>
      <RatingButton>-</RatingButton>
    </Box>
  );
};
