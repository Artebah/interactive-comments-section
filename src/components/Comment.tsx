import React from "react";

import { Box, Button, Typography, styled } from "@mui/material";

import ReplyIconSrc from "../images/icon-reply.svg";
import EditIconSrc from "../images/icon-edit.svg";
import DeleteIconSrc from "../images/icon-delete.svg";

import { UserIcon } from "./UserIcon";
import { ButtonAction } from "./ButtonAction";
import { CommentWrapper } from "./CommentWrapper";

import { IComment } from "../types/Comments";
import { IUser } from "../types/User";

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

type RatingProps = Pick<IComment, "score">;
const Rating = ({ score }: RatingProps) => {
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

type ContentTopProps = Pick<CommentProps, "user" | "createdAt" | "currentUser">;
const ContentTop = ({ user, createdAt, currentUser }: ContentTopProps) => {
  return (
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
        <UserIcon image={user.image} />
        <Typography sx={{ fontWeight: 700, ml: 2 }}>{user.username}</Typography>
      </Button>
      <Typography sx={{ color: "text.secondary", flexGrow: 1 }}>{createdAt}</Typography>
      {currentUser.username !== user.username ? (
        <ButtonAction iconAlt="Reply icon" iconSrc={ReplyIconSrc}>
          Reply
        </ButtonAction>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <ButtonAction iconAlt="Edit" iconSrc={EditIconSrc}>
            Edit
          </ButtonAction>
          <ButtonAction iconAlt="Edit" iconSrc={DeleteIconSrc} isActionDelete>
            Delete
          </ButtonAction>
        </Box>
      )}
    </Box>
  );
};

type ContentBottomProps = Pick<IComment, "content" | "replyingTo">;
const ContentBottom = ({ content, replyingTo }: ContentBottomProps) => {
  return (
    <Box>
      <Typography
        sx={{
          color: "text.secondary",
          pr: 4,
        }}>
        {replyingTo && (
          <Button
            sx={{
              p: 0,
              pb: 0.2,
              textTransform: "lowercase",
              fontSize: "1rem",
              fontWeight: 700,
              mr: 0.5,
            }}>
            @{replyingTo}
          </Button>
        )}
        {content}
      </Typography>
    </Box>
  );
};

type CommentProps = Omit<IComment, "id" | "replies"> & {
  currentUser: IUser;
};
export function Comment({
  content,
  createdAt,
  score,
  user,
  replyingTo,
  currentUser,
}: CommentProps) {
  return (
    <CommentWrapper gap={3}>
      <Rating score={score} />
      <Box sx={{ flexGrow: 1 }}>
        <ContentTop user={user} createdAt={createdAt} currentUser={currentUser} />
        <ContentBottom content={content} replyingTo={replyingTo} />
      </Box>
    </CommentWrapper>
  );
}
