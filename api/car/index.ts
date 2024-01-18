import { Router } from "express";
import { add, getById, updateById, deleteById, get, search } from "./car.controller";

const router = Router();

router.post("/", add);
router.get("/", get);
router.get("/search", search);
router.get("/:id", getById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export = router;
