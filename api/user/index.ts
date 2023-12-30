import { Router } from "express";
import { add, deleteById, get, getById, login, updateById } from "./user.controller";

const router = Router();

router.post('/', add);
router.post('/login', login);
router.get('/', get);
router.get('/:id', getById);
router.patch('/:id', updateById);
router.delete('/:id', deleteById);

export = router;