import React from "react";

import { RepliesWrapper } from "./RepliesWrapper";
import { InputComment } from "./InputComment";
import { StatusTitle } from "./StatusTitle";

import { commentsApi } from "../services/commentsService";
import { CommentLayout } from "./CommentLayout";

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
          {comments.map(({ id: commentId, ...comment }) => (
            <React.Fragment key={commentId}>
              <CommentLayout
                {...comment}
                commentId={commentId}
                currentUser={currentUser}
              />
              <RepliesWrapper>
                {comment.replies.map(({ id: replyId, ...reply }) => (
                  <CommentLayout
                    key={replyId}
                    {...reply}
                    replies={comment.replies}
                    parentComment={{ ...comment, id: commentId }}
                    replyId={replyId}
                    commentId={commentId}
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
