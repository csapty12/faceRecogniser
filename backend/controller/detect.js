const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "5aa74e0a862449f286b86d7501494b4e"
});

const handleApiCall = (req, res) => {
  app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL
    })
    .then(generalModel => generalModel.predict(req.body.input))
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error making call to API"));
};
module.exports = {
  handleApiCall: handleApiCall
};
