import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";

import { UserIcon } from "../UserIcon";
import { ButtonAction } from "./ButtonAction";

import { IUser } from "../../types/User";

import ReplyIconSrc from "../../images/icon-reply.svg";
import EditIconSrc from "../../images/icon-edit.svg";
import DeleteIconSrc from "../../images/icon-delete.svg";
import { DeletePopup } from "../DeletePopup";
import { commentReplyDataContext } from "./Comment";

const ButtonActionUser = () => {
  const commentReplyData = React.useContext(commentReplyDataContext);
  const isReplyButtonClicked = commentReplyData?.isReplyButtonClicked;
  const replyButtonHandler = commentReplyData?.setIsReplyButtonClicked;

  return (
    <ButtonAction
      onClick={() => replyButtonHandler(!isReplyButtonClicked)}
      iconAlt="Reply icon"
      iconSrc={ReplyIconSrc}>
      Reply
    </ButtonAction>
  );
};

const ButtonsActionCurrentUser = () => {
  const [isOpenDeletePopup, setIsOpenDeletePopup] = React.useState(false);
  const theme = useTheme();

  const openDeletePopup = () => {
    setIsOpenDeletePopup(true);
  };
  const closeDeletePopup = () => {
    setIsOpenDeletePopup(false);
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
        onClick={openDeletePopup}
        iconAlt="Delete"
        iconSrc={DeleteIconSrc}
        isActionDelete>
        Delete
      </ButtonAction>
      <ButtonAction iconAlt="Edit" iconSrc={EditIconSrc}>
        Edit
      </ButtonAction>

      <DeletePopup isOpen={isOpenDeletePopup} onClose={closeDeletePopup} />
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
  }, []);

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
