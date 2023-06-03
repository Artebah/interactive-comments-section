import React from "react";

import { Box, Button, Typography, styled, useTheme } from "@mui/material";

import { ratingContext } from "../CommentLayout";

import { commentsApi } from "../../services/commentsService";
import { IComment } from "../../types/Comments";

interface RatingButtonType {
  isActive: boolean;
}
const RatingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<RatingButtonType>(({ theme, isActive }) => ({
  padding: theme.spacing(1.3, 1.4),
  lineHeight: 1,
  minWidth: 0,
  width: "100%",
  color: isActive ? theme.palette.text.primary : "#C7C4DE",
  background: isActive ? "#EEEFF7" : "",
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

  const [mutateRating, { isLoading: isLoadingRating }] =
    commentsApi.useChangeRatingMutation();

  const ratingData = React.useContext(ratingContext);
  const comment = ratingData?.comment;
  const parentComment = ratingData?.parentComment;

  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);

  const changeRating = (type: "like" | "dislike", isReset?: boolean) => {
    if (comment) {
      let newRating: number;

      if (type === "like") {
        if (isReset) {
          console.log("reset");
          newRating = score + 1;
        } else {
          if (isDisliked) {
            console.log("like after dislike");
            newRating = score + 2;
          } else {
            console.log("like");
            newRating = score + 1;
          }
        }
      } else {
        if (isReset) {
          console.log("reset");
          newRating = score - 1;
        } else {
          if (isLiked) {
            console.log("dislike after like");
            newRating = score - 2;
          } else {
            console.log("dislike");
            newRating = score - 1;
          }
        }
      }

      let newComment: IComment;

      const replyId = comment.replyId;

      if (parentComment && replyId) {
        newComment = {
          ...parentComment,
          replies: [...parentComment.replies],
        };

        newComment.replies[replyId - 1] = {
          ...newComment.replies[replyId - 1],
          score: newRating,
        };

        mutateRating(newComment);
      } else {
        newComment = {
          ...comment,
          score: newRating,
        };

        mutateRating(newComment);
      }
    }
  };

  const likeButtonHandler = () => {
    if (!isLiked) {
      changeRating("like");
      setIsLiked(true);
      setIsDisliked(false);
    } else {
      changeRating("dislike", true);
      setIsLiked(false);
    }
  };
  const dislikeButtonHandler = () => {
    if (!isDisliked) {
      changeRating("dislike");
      setIsDisliked(true);
      setIsLiked(false);
    } else {
      changeRating("like", true);
      setIsDisliked(false);
    }
  };

  //const likeButtonHandler = () => {
  //  if (isLiked) {
  //    removeLike();
  //    setIsLiked(false);
  //  } else {
  //    addLike();
  //    setIsLiked(true);
  //  }
  //};
  //const dislikeButtonHandler = () => {
  //  if (isDisliked) {
  //    addLike();
  //    setIsDisliked(false);
  //  } else {
  //    removeLike();
  //    setIsDisliked(true);
  //  }
  //};

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
      <RatingButton
        isActive={isLiked}
        disabled={isLoadingRating}
        onClick={likeButtonHandler}>
        +
      </RatingButton>
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
      <RatingButton
        isActive={isDisliked}
        disabled={isLoadingRating}
        onClick={dislikeButtonHandler}>
        -
      </RatingButton>
    </Box>
  );
};
