const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        let data = new Date().toISOString().replace(/:/g,'-') + '-';
        cb(null, data + file.originalname );
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1054 * 1024 * 5
    },
    fileFilter: fileFilter
});


// Retorna todos os eventos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM eventos;',
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    quantidade: result.length,
                    eventos: result.map(evt => {
                        return {
                            id_evento: evt.id_evento,
                            nome_evento: evt.nome_evento,
                            data: evt.data,
                            up_nota_fiscal: evt.up_nota_fiscal,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um evento específico',
                                url: 'http://localhost:3000/eventos/' + evt.id_evento
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        );
    });
});

// Insere um evento
router.post('/', upload.single('up_nota_fiscal'), (req, res, next) => {
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO eventos(nome_evento, data, ativo, valorTotal_evento, up_nota_fiscal) VALUES (?,?,?,?,?)',
            [req.body.nome_evento,
            req.body.data,
            req.body.ativo,
            req.body.valorTotal_evento,
            req.file.path,
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    mensagem: 'Evento inserido com sucesso',
                    eventoCriado: {
                        id_evento: result.id_evento,
                        nome_evento: req.body.nome_evento,
                        data: req.body.data,
                        ativo: req.body.ativo,
                        valorTotal_evento: req.body.valorTotal_evento,
                        up_nota_fiscal: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os eventos',
                            url: 'http://localhost:3000/eventos'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });

});

// Retorna os dados de um evento
router.get('/:id_evento', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM eventos WHERE id_evento = ?;',
            [req.params.id_evento],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado evento com este ID'
                    })
                }
                const response = {                    
                    evento: {
                        id_evento: result[0].id_evento,
                        nome_evento: result[0].nome_evento,
                        data: result[0].data,
                        ativo: result[0].ativo,
                        valorTotal_evento: result[0].valorTotal_evento,
                        up_nota_fiscal: result[0].up_nota_fiscal,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um evento',
                            url: 'http://localhost:3000/eventos'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        );
    });
});

// Altera um evento
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `UPDATE eventos
                SET nome_evento = ?,
                    data = ?,
                    ativo = ?,
                    valorTotal_evento = ?,
                    up_nota_fiscal = ?
                WHERE id_evento = ?;`,
            [req.body.nome_evento,
            req.body.data,
            req.body.ativo,
            req.body.valorTotal_evento,
            req.body.up_nota_fiscal,
            req.body.id_evento,
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    eventoAtualizado:{
                        id_evento: req.body.id_evento,
                        nome_evento: req.body.nome_evento,
                        data: req.body.data,
                        ativo: req.body.ativo,
                        valorTotal_evento: req.body.valorTotal_evento,
                        up_nota_fiscal: req.body.up_nota_fiscal,
                        request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um evento específico',
                                url: 'http://localhost:3000/eventos/' + req.body.id_evento
                            }
                        }
                }
                res.status(202).send(response);
            }
        )
    });
});

// Exclui um evento
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `DELETE FROM eventos WHERE id_evento = ?`,
            [req.body.id_evento],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    mensagem: 'Evento removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um evento',
                        url: 'http://localhost:3000/produtos',
                        body:{
                            nome_evento: 'String',
                            data: 'Date',
                            ativo: 'Boolean',
                            valorTotal_evento: 'Number',
                            up_nota_fiscal: 'String'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;