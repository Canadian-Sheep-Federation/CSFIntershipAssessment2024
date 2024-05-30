import "./App.css";
import Menu from "./Components/Menu";
import NavBar from "./Components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <header className="App-header">
          <NavBar />
          <Menu />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
