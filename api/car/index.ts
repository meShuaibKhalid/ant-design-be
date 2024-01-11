import { Router } from "express";
import { add, getById, updateById, deleteById, get } from "./car.controller";

const router = Router();

router.post("/", add);
router.get("/", get);
router.get("/:id", getById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export = router;
