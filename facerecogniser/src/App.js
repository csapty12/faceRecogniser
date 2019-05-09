import React from "react";
import "./App.css";
import Navigation from "./components/Naviation/Navigation";
import ImageLinkForm from "./components/Form/imageLinkForm/ImageLinkForm";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ImageLinkForm />
      {/* 
      <FaceDetector /> */}
    </div>
  );
}

export default App;
