const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

// POST /forms
router.post("/", async (req, res) => {
  const { name, email, movie } = req.body;
  const form = new Form({ name, email, movie });
  await form.save();
  res.json({ id: form._id });
});

// GET /forms/:id
router.get("/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

// GET /forms
router.get("/", async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

// PUT /forms/:id
router.put("/:id", async (req, res) => {
  const { name, email, movie } = req.body;
  const updatedForm = await Form.findByIdAndUpdate(
    req.params.id,
    { name, email, movie },
    { new: true }
  );
  res.json(updatedForm);
});

// DELETE /forms/:id
router.delete("/:id", async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.json({ message: "Form deleted" });
});

module.exports = router;
