import { Box, useTheme } from "@mui/material";

import { IComment } from "../../types/Comments";
import { IUser } from "../../types/User";

import { CommentWrapper } from "../CommentWrapper";
import { ContentTop } from "./ContentTop";
import { ContentBottom } from "./ContentBottom";
import { Rating } from "./Rating";

type CommentProps = Omit<IComment, "id" | "replies"> & {
  currentUser: IUser;
};
export function Comment(props: CommentProps) {
  const { content, createdAt, score, user, replyingTo, currentUser } = props;
  const theme = useTheme();

  return (
    <CommentWrapper
      gap={3}
      sxExtra={{
        [theme.breakpoints.down("md")]: {
          flexDirection: "column-reverse",
          position: "relative",
        },
      }}>
      <Rating score={score} />
      <Box sx={{ flexGrow: 1 }}>
        <ContentTop user={user} createdAt={createdAt} currentUser={currentUser} />
        <ContentBottom content={content} replyingTo={replyingTo} />
      </Box>
    </CommentWrapper>
  );
}
