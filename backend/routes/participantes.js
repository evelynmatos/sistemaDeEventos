const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os participantes
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `select participantes.id_participante,
                    participantes.nome_participante,
                    participantes.setor,
                    participantes.patrocinador,
                    participantes.valor_participante,
                    eventos.id_evento,
                    eventos.nome_evento,
                    eventos.data,
                    eventos.ativo,
                    eventos.valorTotal_evento,
                    eventos.up_nota_fiscal
                from participantes 
            inner join eventos 
                on eventos.id_evento = participantes.id_evento;`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    participantes: result.map(pt => {
                        return {
                            id_participante: pt.id_participante,
                            nome_participante: pt.nome_participante,
                            setor: pt.setor,
                            patrocinador: pt.patrocinador,
                            valor_participante: pt.valor_participante,
                            evento: {
                                id_evento: pt.id_evento,
                                nome_evento: pt.nome_evento,
                                data: pt.data
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um participante específico',
                                url: 'http://localhost:3000/participantes/' + pt.id_participante
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        );
    });
});

// Insire um participante
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query('SELECT * FROM eventos WHERE id_evento = ?',
            [req.body.id_evento],
            (error, result, field) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Evento não encontrado'
                    })
                }
                conn.query(
                    'INSERT INTO participantes(id_evento, nome_participante, setor, patrocinador, valor_participante) VALUES (?,?,?,?,?)',
                    [req.body.id_evento,
                    req.body.nome_participante,
                    req.body.setor,
                    req.body.patrocinador,
                    req.body.valor_participante,
                    ],
                    (error, result, field) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({ error: error })
                        }
                        const response = {
                            mensagem: 'Participante inserido com sucesso',
                            participanteCriado: {
                                id_participante: result.id_participante,
                                id_evento: req.body.id_evento,
                                nome_participante: req.body.nome_participante,
                                setor: req.body.setor,
                                patrocinador: req.body.patrocinador,
                                valor_participante: req.body.valor_participante,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os participantes',
                                    url: 'http://localhost:3000/participantes'
                                }
                            }
                        }
                        return res.status(201).send(response);
                    }
                )
            })
    })
});

// Retorna os dados de um participante
router.get('/:id_participante', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM participantes WHERE id_participante = ?;',
            [req.params.id_participante],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado nenhum participante com este ID'
                    })
                }
                const response = {
                    participante: {
                        id_participante: result[0].id_participante,
                        id_evento: result[0].id_evento,
                        nome_participante: result[0].nome_participante,
                        setor: result[0].setor,
                        patrocinador: result[0].patrocinador,
                        valor_participante: result[0].valor_participante,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os participantes',
                            url: 'http://localhost:3000/participantes'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        );
    });

});

// Exclui um participante
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `DELETE FROM participantes WHERE id_participante = ?`,
            [req.body.id_participante],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    mensagem: 'Participante removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um participante',
                        url: 'http://localhost:3000/participantes',
                        body: {
                            id_participante: 'String',
                            nome_participante: 'String',
                            setor: 'String',
                            patrocinador: 'String',
                            valor_participante: 'Number'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;