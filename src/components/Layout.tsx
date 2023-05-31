import React from "react";

import { Comment } from "./comment/Comment";
import { RepliesWrapper } from "./RepliesWrapper";
import { InputComment } from "./InputComment";
import { StatusTitle } from "./StatusTitle";

import { commentsApi } from "../services/commentsService";

export function Layout() {
  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = commentsApi.useGetCommentsQuery();

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isError: isErrorCurrentUser,
  } = commentsApi.useGetCurrentUserQuery();

  return (
    <>
      {isLoadingComments && <StatusTitle>Comments are loading...</StatusTitle>}
      {isErrorComments && <StatusTitle>Error: couldn't load comments :(</StatusTitle>}
      {isLoadingCurrentUser && <StatusTitle>User data is loading...</StatusTitle>}
      {isErrorCurrentUser && <StatusTitle>Error: couldn't load user data :(</StatusTitle>}

      {comments && currentUser && (
        <>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <Comment {...comment} currentUser={currentUser} />
              <RepliesWrapper>
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    isReply
                    {...reply}
                    parentComment={comment}
                    currentUser={currentUser}
                  />
                ))}
              </RepliesWrapper>
            </React.Fragment>
          ))}
          <InputComment currentUser={currentUser} />
        </>
      )}
    </>
  );
}
