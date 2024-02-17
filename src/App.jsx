import { useState } from "react";
import "./App.css";
import UploadFile from "./components/UploadFile";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <UploadFile></UploadFile>
    </>
  );
}

export default App;
