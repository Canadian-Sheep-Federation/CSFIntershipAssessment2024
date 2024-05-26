import FormResponseModel from "../model/FormResponse.js";

export const getFormsViaMovieID = async (req, res) => {
  const { id } = req.params;

  try {
    const myForm = await FormResponseModel.find({
      imdbID: id,
    });
    if (!myForm) {
      res.status(200).send("No Form responses not found");
    } else {
      res.status(200).json(myForm);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const getAllForms = async (req, res) => {
  try {
    const formResponses = await FormResponseModel.find();
    res.status(200).send(formResponses);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getFormViaID = async (req, res) => {
  const { id } = req.params;

  try {
    const myForm = await FormResponseModel.findById(id);
    if (!myForm) {
      res.status(404).send("Form response not found");
    } else {
      res.status(200).json(myForm);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const saveNewFormResponse = async (req, res) => {
  try {
    const { name, email, feedback, rating, imdbID } = req.body;
    const formResponse = new FormResponseModel({
      imdbID: imdbID,
      name: name,
      email: email,
      feedback: feedback,
      rating: rating,
    });
    await formResponse.save();

    res.status(200).send({ id: formResponse._id });
  } catch (err) {
    res.status(500).send(err);
  }
};
