// database-postgres.js
import { randomUUID } from "crypto";
import sql from "./db.js";

export class DatabasePostgres {

    #pessoas = new Map();

    async list(search = '') {
        let pessoas;

        if (search) {
            pessoas = await sql`SELECT * FROM pessoas WHERE nome ILIKE ${`%${search}%`}`;
        } else {
            pessoas = await sql`SELECT * FROM pessoas`;
        }

        return pessoas;
    }

    async create(pessoa) {
        const idPessoa = randomUUID();

        await sql`
            INSERT INTO pessoas (id, nome, idade, sexo, ocupacao)
            VALUES (${idPessoa}, ${pessoa.nome}, ${pessoa.idade}, ${pessoa.sexo}, ${pessoa.ocupacao})
        `;

        this.#pessoas.set(idPessoa, pessoa);
    }

    async update(id, pessoa) {
        await sql`
            UPDATE pessoas
            SET nome = ${pessoa.nome},
                idade = ${pessoa.idade},
                sexo = ${pessoa.sexo},
                ocupacao = ${pessoa.ocupacao}
            WHERE id = ${id}
        `;
    }

    async delete(id) {
        await sql`DELETE FROM pessoas WHERE id = ${id}`;
    }
}
