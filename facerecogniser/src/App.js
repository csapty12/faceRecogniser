import React, { Component, Fragment } from "react";
import "./App.css";
import Navigation from "./components/Naviation/Navigation";
import ImageLinkForm from "./components/Form/imageLinkForm/ImageLinkForm";
import Clarifai from "clarifai";
import FaceDetector from "./components/faceDetector/FaceDetector";
import SignInForm from "./components/Form/signInForm/SignInForm";
import RegisterForm from "./components/Form/registerForm/RegisterForm";

const app = new Clarifai.App({
  apiKey: "5aa74e0a862449f286b86d7501494b4e"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin"
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("width: " + width + ", height: " + height);
    const rightColW = clarifaiFace.right_col * width;
    const bottomRowH = clarifaiFace.bottom_row * height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - rightColW,
      bottomRow: height - bottomRowH
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box });
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
      .then(response => this.calculateFaceLocation(response))
      .then(faceBox => this.displayFaceBox(faceBox))
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    this.setState({ route: route });
  };
  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <Fragment>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceDetector url={this.state.imageURL} box={this.state.box} />
          </Fragment>
        ) : this.state.route === "register" ? (
          <RegisterForm onRouteChange={this.onRouteChange} />
        ) : (
          <SignInForm onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}
