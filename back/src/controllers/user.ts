import { Response } from 'express';
import { db } from '../db';

// Exporta para o router com a request e o response
// Aqui nao precisa de req por conta que o usuario nao vai enviar nada  

export const getUsers = (_ : any, res : Response) => {
    const q = "SELECT * FROM users"

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })

}