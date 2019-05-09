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
      imageURL: ""
    };
  }
  onInputChange = event => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    console.log("here");
    this.setState({ imageURL: this.state.input });

    // app.models
    //   .initModel({
    //     id: Clarifai.COLOR_MODEL
    //   })
    //   .then(generalModel => {
    //     return generalModel.predict(
    //       "https://samples.clarifai.com/metro-north.jpg"
    //     );
    //   })
    //   .then(response => {
    //     var concepts = response["outputs"][0]["data"]["concepts"];
    //     console.log(
    //       "concepts: " +
    //         JSON.stringify(response["outputs"][0]["data"]["colors"])
    //     );
    //   });
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
