import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { UserIcon } from "../UserIcon";
import { ButtonAction } from "./ButtonAction";

import { IUser } from "../../types/User";

import ReplyIconSrc from "../../images/icon-reply.svg";
import EditIconSrc from "../../images/icon-edit.svg";
import DeleteIconSrc from "../../images/icon-delete.svg";
import { DeletePopup } from "../DeletePopup";

const ButtonActionUser = () => {
  return (
    <ButtonAction iconAlt="Reply icon" iconSrc={ReplyIconSrc}>
      Reply
    </ButtonAction>
  );
};

const ButtonsActionCurrentUser = () => {
  const [isOpenDeletePopup, setIsOpenDeletePopup] = React.useState(false);

  console.log(isOpenDeletePopup);

  const openDeletePopup = () => {
    setIsOpenDeletePopup(true);
  };
  const closeDeletePopup = () => {
    setIsOpenDeletePopup(false);
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <ButtonAction iconAlt="Edit" iconSrc={EditIconSrc}>
        Edit
      </ButtonAction>
      <ButtonAction
        onClick={openDeletePopup}
        iconAlt="Delete"
        iconSrc={DeleteIconSrc}
        isActionDelete>
        Delete
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
        <ButtonActionUser />
      ) : (
        <ButtonsActionCurrentUser />
      )}
    </Box>
  );
};
