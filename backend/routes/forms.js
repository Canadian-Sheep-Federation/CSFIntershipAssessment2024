import express from "express";
import {
  getAllForms,
  getFormViaID,
  getFormsViaMovieID,
  saveNewFormResponse,
} from "../controllers/forms.js";

const router = express.Router();

router.get("/", getAllForms);
router.get("/:id", getFormViaID);
router.get("/movie/:id", getFormsViaMovieID);

router.post("/", saveNewFormResponse);

export default router;
