import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReplyIconSrc from "../images/icon-reply.svg";
import { CommentWrapper } from "./CommentWrapper";
import { UserIcon } from "./UserIcon";
import { ButtonAction } from "./ButtonAction";

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

const Rating = () => (
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
      12
    </Typography>
    <RatingButton>-</RatingButton>
  </Box>
);

const ContentTop = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 1.5,
    }}>
    <Button
      sx={{
        color: "text.primary",
        textTransform: "lowercase",
        mr: 1,
        ":hover": { background: "none" },
      }}
      disableRipple>
      <UserIcon src="#" />
      <Typography sx={{ fontWeight: 700, ml: 2 }}>amyrobson</Typography>
    </Button>
    <Typography sx={{ color: "text.secondary", flexGrow: 1 }}>1 month ago</Typography>
    <ButtonAction iconAlt="Reply icon" iconSrc={ReplyIconSrc}>
      Reply
    </ButtonAction>
  </Box>
);

const ContentBottom = () => (
  <Box>
    <Typography
      sx={{
        color: "text.secondary",
        pr: 4,
      }}>
      Impressive! Though it seems the drag feature could be improved. But overall it looks
      incredible. You've nailed the design and the responsiveness at various breakpoints
      works really well.
    </Typography>
  </Box>
);

export function Comment() {
  return (
    <CommentWrapper gap={3}>
      <Rating />
      <Box sx={{ flexGrow: 1 }}>
        <ContentTop />
        <ContentBottom />
      </Box>
    </CommentWrapper>
  );
}
