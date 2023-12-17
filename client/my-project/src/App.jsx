import { useState } from "react";
import reactLogo from "./assets/react.svg";

import Mainpage from "./components/Mainpage";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <Mainpage />
      </ThemeProvider>
    </>
  );
}

export default App;
