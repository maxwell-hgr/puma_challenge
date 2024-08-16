import {
  registerUser,
  getUsers,
  deleteUser,
  starUser,
} from "../controllers/UserController";

import { Router } from "express";
const router = new Router();

router.post("/:user", registerUser);
router.get("/", getUsers);
router.delete("/:username", deleteUser);
router.patch("/:username/toggle-star", starUser);

export default router;
