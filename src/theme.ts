import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xl: 1440,
      lg: 750,
      md: 600,
      sm: 400,
      xs: 0,
    },
  },

  typography: {
    fontFamily: "Rubik",
  },
  palette: {
    primary: { main: "hsl(238, 40%, 52%)" },
    secondary: { main: "hsl(228, 33%, 97%)" },
    text: {
      primary: "hsl(209, 15%, 28%)",
      secondary: "hsl(211, 10%, 45%)",
    },
    error: {
      main: "hsl(358, 79%, 66%)",
    },
  },
});

console.log(theme);
