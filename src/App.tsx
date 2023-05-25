import React from "react";

import { Box, Container, Typography } from "@mui/material";

import { Comment } from "./components/Comment";
import { ReplyWrapper } from "./components/ReplyWrapper";
import { commentsApi } from "./services/commentsService";
import { InputReply } from "./components/InputReply";

function App() {
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
    <Box className="App">
      <Container maxWidth="lg">
        {isLoadingComments && <Typography>Comments are loading...</Typography>}
        {isErrorComments && <Typography>Error: couldn't load comments :(</Typography>}
        {isLoadingCurrentUser && <Typography>User data is loading...</Typography>}
        {isErrorCurrentUser && <Typography>Error: couldn't load user data :(</Typography>}
        {currentUser && (
          <>
            {comments &&
              comments.map(
                ({ id: commentId, content, createdAt, score, user, replies }) => (
                  <React.Fragment key={commentId}>
                    <Comment
                      content={content}
                      createdAt={createdAt}
                      score={score}
                      user={user}
                      currentUser={currentUser}
                    />
                    <ReplyWrapper>
                      {replies.map(
                        ({
                          id: replyId,
                          content,
                          createdAt,
                          score,
                          user,
                          replyingTo,
                        }) => (
                          <Comment
                            key={replyId}
                            content={content}
                            createdAt={createdAt}
                            score={score}
                            user={user}
                            replyingTo={replyingTo}
                            currentUser={currentUser}
                          />
                        )
                      )}
                    </ReplyWrapper>
                  </React.Fragment>
                )
              )}
            <InputReply currentUser={currentUser} />
          </>
        )}
      </Container>

      {/*Frontend mentor*/}
      <div className="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/Artebah">Artem Litvin</a>.
      </div>
    </Box>
  );
}

export default App;
