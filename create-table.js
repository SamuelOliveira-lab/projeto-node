// create-table-pessoas.js
import sql from './db.js';

// Caso queira recriar sempre, descomente:
// await sql`DROP TABLE IF EXISTS pessoas`;

await sql`
CREATE TABLE IF NOT EXISTS pessoas (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    idade INTEGER,
    sexo CHAR(1) CHECK (sexo IN ('F', 'M')),
    ocupacao TEXT
);
`;

console.log('Tabela "pessoas" criada com sucesso.');
