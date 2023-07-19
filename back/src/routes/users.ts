import express from 'express';
import { getUsers } from '../controllers/user';

// Indicando que é uma rota
const router = express.Router();

// O get joga para esse caminho e inicializa a função especificada
router.get('/', getUsers)

export default router;