import { Router } from "express";
import { addUser, getUserDetails, getAll } from "./controller/user";

export const router: Router = Router();

router.put('/addUser', addUser);
router.get('/getUser/:id', getUserDetails);
router.get('/getAllUsers', getAll);