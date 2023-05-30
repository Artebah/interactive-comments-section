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
              <Comment
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                user={comment.user}
                currentUser={currentUser}
              />
              <RepliesWrapper>
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    score={reply.score}
                    user={reply.user}
                    replyingTo={reply.replyingTo}
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
