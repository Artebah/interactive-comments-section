import React from "react";
import { Box, Container } from "@mui/material";
import { Comment } from "./components/Comment";
import { InputReply } from "./components/InputReply";
import { SubCommentWrapper } from "./components/SubCommentWrapper";

function App() {
  return (
    <Box className="App">
      <Container maxWidth="lg">
        <Comment />
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
