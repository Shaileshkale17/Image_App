import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Outlet } from "react-router-dom";
import Navber from "./components/Navber";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
}

export default App;
