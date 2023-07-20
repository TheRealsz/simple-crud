import { Response } from 'express';
import { db } from '../db';

// Onde ira ficar as funcoes de manipulação de dados

// Exporta para o router com a request e o response
// Aqui nao precisa de req por conta que o usuario nao vai enviar nada  

// Utilizando essa sintaxe para poder usar tipagens genericas para o body. 
// https://plainenglish.io/blog/typed-express-request-and-response-with-typescript
export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
export interface TypedRequestParams<P> extends Express.Request {
    params: P
}

// Tirar o any
export const getUsers = (_: any, res: Response) => {
    const q = "SELECT * FROM users"

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })

}

export const postUser = (req: TypedRequestBody<{ nome: string, email: string, tel: string }>, res: Response) => {
    // Tratamento de erro caso nao haja req com body
    if (!req.body) {
        return res.status(400).json("Corpo da requisição vazio!");
    }
    // .
    const q = "INSERT INTO users VALUES ('', 'nome', 'email', 'tel');"

    const values = [
        req.body.nome,
        req.body.email,
        req.body.tel,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario cadastrado com sucesso!");
    })
}

export const putUser = (req: TypedRequestBody<{ nome: string, email: string, tel: string }> | TypedRequestParams<{ ID: string }>, res: Response) => {
    if (!req.body || !req.params) {
        return res.status(400).json("Corpo da requisição vazio!");
    }

    const q = "UPDATE users SET 'nome' = ?, 'email' = ?, 'tel' = ? WHERE 'ID' = ?"

    const values = [
        req.body.nome,
        req.body.email,
        req.body.tel
    ]

    db.query(q, [...values, req.params.ID], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario atualizado com sucesso!")

    })
}

export const deleteUser = (req: TypedRequestParams<{ ID: string }>, res: Response) => {
    if (!req.params.ID) {
        return res.status(400).json("Erro na requisição!");
    }

    const q = "DELETE FROM users WHERE 'ID' = ?"

    db.query(q, [req.params.ID], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario deletado com sucesso!")

    })
}