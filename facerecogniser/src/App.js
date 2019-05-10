import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Naviation/Navigation";
import ImageLinkForm from "./components/Form/imageLinkForm/ImageLinkForm";
import Clarifai from "clarifai";
import FaceDetector from "./components/faceDetector/FaceDetector";

const app = new Clarifai.App({
  apiKey: "5aa74e0a862449f286b86d7501494b4e"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageURL: "",
      box: {}
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data["outputs"][0]["data"]["regions"][0]["region_info"]["bounding_box"];
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL
      })
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        this.calculateFaceLocation(response);
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log("image url:" + this.state.imageURL);
    return (
      <div className="App">
        <Navigation />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />

        <FaceDetector url={this.state.imageURL} />
      </div>
    );
  }
}
