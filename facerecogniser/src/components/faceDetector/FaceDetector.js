import React from "react";
import "./FaceDetector.css";

export default function FaceDetector({ url, box }) {
  return (
    <div className="center">
      <br />
      <div className="absolute mt2">
        <img id="inputImage" src={url} alt="" height="auto" width="300px" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
