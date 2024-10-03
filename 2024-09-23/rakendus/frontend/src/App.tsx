import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Cats from "./components/Cats";
import Todos from "./components/Todos";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    primary: {
      main: "#FF69B4",
    },
    secondary: {
      main: "#FF5722",
    },
    background: {
      default: "#f0f0f0",
      paper: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#555",
    },
  },
  typography: {
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Cats />
        <Todos />
      </>
    </ThemeProvider>
  );
}

export default App;

// npm run dev
// localhost:3000