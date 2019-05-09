import React from "react";
import "./imageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3">{"FIND A FACE"}</p>
      <div className="center">
        <div className="shadow-5 pa4 w-80 center">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <br />
          <button
            className="w-30 grow f4 link pv2 ph3 dib white bg-light-purple"
            type="submit"
            onClick={onSubmit}
          >
            Go!
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
