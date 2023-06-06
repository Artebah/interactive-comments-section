import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";

import { UserIcon } from "../UserIcon";
import { ButtonAction } from "./ButtonAction";
import { DeletePopup } from "../DeletePopup";

import { IUser } from "../../types/User";

import ReplyIconSrc from "../../images/icon-reply.svg";
import EditIconSrc from "../../images/icon-edit.svg";
import DeleteIconSrc from "../../images/icon-delete.svg";

import { editContext, replyContext } from "../CommentLayout";

const ButtonActionUser = () => {
  const commentReplyData = React.useContext(replyContext);
  const isReplyButtonClicked = commentReplyData?.isReplyButtonClicked;
  const setIsReplyButtonClicked = commentReplyData?.setIsReplyButtonClicked;

  const replyButtonHandler = () => {
    if (setIsReplyButtonClicked) {
      setIsReplyButtonClicked(!isReplyButtonClicked);
    }
  };

  return (
    <ButtonAction
      onClick={replyButtonHandler}
      iconAlt="Reply icon"
      iconSrc={ReplyIconSrc}>
      Reply
    </ButtonAction>
  );
};

const ButtonsActionCurrentUser = () => {
  const theme = useTheme();

  const [isOpenDeletePopup, setIsOpenDeletePopup] = React.useState(false);

  const editData = React.useContext(editContext);

  const isEditButtonClicked = editData?.isEditButtonClicked;
  const setIsEditButtonClicked = editData?.setIsEditButtonClicked;

  const toggleDeletePopup = (value: boolean) => {
    setIsOpenDeletePopup(value);
  };

  const editButtonHandler = () => {
    if (setIsEditButtonClicked) {
      setIsEditButtonClicked(!isEditButtonClicked);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        [theme.breakpoints.down("sm")]: {
          gap: 0.5,
        },
      }}>
      <ButtonAction
        onClick={() => toggleDeletePopup(true)}
        iconAlt="Delete"
        iconSrc={DeleteIconSrc}
        isActionDelete>
        Delete
      </ButtonAction>
      <ButtonAction onClick={editButtonHandler} iconAlt="Edit" iconSrc={EditIconSrc}>
        Edit
      </ButtonAction>

      <DeletePopup isOpen={isOpenDeletePopup} onClose={() => toggleDeletePopup(false)} />
    </Box>
  );
};

interface ContentTopProps {
  user: IUser;
  createdAt: string;
  currentUser: IUser;
}
export const ContentTop = (props: ContentTopProps) => {
  const { user, currentUser, createdAt } = props;
  const theme = useTheme();

  const isCurrentUser = React.useCallback(() => {
    if (user.username === currentUser.username) {
      return true;
    }
    return false;
  }, [currentUser, user]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1.5,
        flexWrap: "wrap",
      }}>
      <Button
        sx={{
          color: "text.primary",
          textTransform: "lowercase",
          p: 0,
          mr: isCurrentUser() ? 0 : 1,
          ":hover": { background: "none" },
        }}
        disableRipple>
        <UserIcon image={user.image} />
        <Typography sx={{ fontWeight: 700, ml: 2 }}>{user.username}</Typography>
      </Button>
      {isCurrentUser() && (
        <Box
          component="span"
          sx={{
            mx: 1,
            bgcolor: "primary.main",
            color: "#fff",
            fontSize: "0.875rem",
            px: 0.8,
            borderRadius: 1,
          }}>
          you
        </Box>
      )}
      <Typography
        sx={{
          color: "text.secondary",
          flexGrow: 1,
        }}>
        {createdAt}
      </Typography>
      <Box
        sx={{
          [theme.breakpoints.down("md")]: {
            position: "absolute",
            right: 20,
            bottom: 17,
          },
          [theme.breakpoints.down("sm")]: {
            bottom: 20,
          },
        }}>
        {isCurrentUser() ? <ButtonsActionCurrentUser /> : <ButtonActionUser />}
      </Box>
    </Box>
  );
};
