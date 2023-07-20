import express from 'express';
import { getUsers, postUser,  putUser, deleteUser } from '../controllers/user';

// Indicando que é uma rota
const router = express.Router();

// O get joga para esse caminho e inicializa a função especificada
router.get('/', getUsers)

router.post('/', postUser)

router.put('/:ID', putUser)

router.delete('/:ID', deleteUser)

export default router;