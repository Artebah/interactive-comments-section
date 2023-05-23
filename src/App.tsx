import React from "react";

import { Box, Container, Typography } from "@mui/material";

import { Comment } from "./components/Comment";
import { ReplyWrapper } from "./components/ReplyWrapper";
import { commentsApi } from "./services/commentsService";
import { InputReply } from "./components/InputReply";

function App() {
  const { data: comments, isLoading, isError } = commentsApi.useGetCommentsQuery();

  return (
    <Box className="App">
      <Container maxWidth="lg">
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error :(</Typography>}
        {comments &&
          comments.map(({ id, content, createdAt, score, user, replies }) => (
            <React.Fragment key={id}>
              <Comment
                content={content}
                createdAt={createdAt}
                score={score}
                user={user}
              />
              <ReplyWrapper>
                {replies.map(({ content, createdAt, score, user, replyingTo }) => (
                  <Comment
                    content={content}
                    createdAt={createdAt}
                    score={score}
                    user={user}
                    replyingTo={replyingTo}
                  />
                ))}
              </ReplyWrapper>
            </React.Fragment>
          ))}
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
