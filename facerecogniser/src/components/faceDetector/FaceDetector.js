import React from "react";

export default function FaceDetector({ url }) {
  return (
    <div className="center">
      <br />
      <img src={url} alt="" height="auto" width="300px" />
    </div>
  );
}
