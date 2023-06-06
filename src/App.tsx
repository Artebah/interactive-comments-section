import React from "react";

import { Box, Container } from "@mui/material";

import { Layout } from "./components/Layout";

function App() {
  return (
    <Box className="App">
      <Container sx={{ mb: 2 }} maxWidth="lg">
        <Layout />
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
