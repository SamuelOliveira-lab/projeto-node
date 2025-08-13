// server.js
import { fastify } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres();

// Registro do Swagger
await server.register(swagger, {
    swagger: {
        info: {
            title: 'API de Pessoas',
            description: 'Documentação da API de cadastro de pessoas',
            version: '1.0.0'
        },
        host: process.env.RENDER_EXTERNAL_URL 
              ? process.env.RENDER_EXTERNAL_URL.replace('https://', '') 
              : `localhost:${process.env.PORT || 3333}`,
        schemes: ['https', 'http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
});


await server.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: true
    },
    staticCSP: true
});

// Rotas com documentação

// Criar pessoa
server.post('/pessoas', {
    schema: {
        description: 'Cadastra uma nova pessoa',
        tags: ['Pessoas'],
        body: {
            type: 'object',
            required: ['nome'],
            properties: {
                nome: { type: 'string' },
                idade: { type: 'integer' },
                sexo: { type: 'string', enum: ['F', 'M'] },
                ocupacao: { type: 'string' }
            }
        },
        response: {
            201: { description: 'Pessoa criada com sucesso', type: 'null' },
            400: { description: 'Erro de validação', type: 'object', properties: { error: { type: 'string' } } }
        }
    }
}, async (request, reply) => {
    const { nome, idade, sexo, ocupacao } = request.body;

    if (sexo && !['F', 'M'].includes(sexo.toUpperCase())) {
        return reply.status(400).send({ error: 'Sexo deve ser "F" ou "M".' });
    }

    await database.create({
        nome,
        idade,
        sexo: sexo ? sexo.toUpperCase() : null,
        ocupacao
    });

    return reply.status(201).send();
});

// Listar pessoas
server.get('/pessoas', {
    schema: {
        description: 'Lista todas as pessoas cadastradas, com busca opcional por nome',
        tags: ['Pessoas'],
        querystring: {
            type: 'object',
            properties: {
                search: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        nome: { type: 'string' },
                        idade: { type: 'integer' },
                        sexo: { type: 'string' },
                        ocupacao: { type: 'string' }
                    }
                }
            }
        }
    }
}, async (request) => {
    const search = request.query.search;
    return await database.list(search);
});

// Atualizar pessoa
server.put('/pessoas/:id', {
    schema: {
        description: 'Atualiza os dados de uma pessoa pelo ID',
        tags: ['Pessoas'],
        params: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        body: {
            type: 'object',
            properties: {
                nome: { type: 'string' },
                idade: { type: 'integer' },
                sexo: { type: 'string', enum: ['F', 'M'] },
                ocupacao: { type: 'string' }
            }
        },
        response: {
            204: { description: 'Pessoa atualizada com sucesso', type: 'null' },
            400: { description: 'Erro de validação', type: 'object', properties: { error: { type: 'string' } } }
        }
    }
}, async (request, reply) => {
    const pessoaId = request.params.id;
    const { nome, idade, sexo, ocupacao } = request.body;

    if (sexo && !['F', 'M'].includes(sexo.toUpperCase())) {
        return reply.status(400).send({ error: 'Sexo deve ser "F" ou "M".' });
    }

    await database.update(pessoaId, {
        nome,
        idade,
        sexo: sexo ? sexo.toUpperCase() : null,
        ocupacao
    });

    return reply.status(204).send();
});

// Deletar pessoa
server.delete('/pessoas/:id', {
    schema: {
        description: 'Remove uma pessoa pelo ID',
        tags: ['Pessoas'],
        params: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id']
        },
        response: {
            204: { description: 'Pessoa removida com sucesso', type: 'null' }
        }
    }
}, async (request, reply) => {
    const pessoaId = request.params.id;
    await database.delete(pessoaId);
    return reply.status(204).send();
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});