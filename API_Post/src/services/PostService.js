const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM post', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM post WHERE id = ?', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },
    inserir: (title, body, date)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO post (title, body, date) VALUES (?, ?, ?)',
                [title, body, date],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertId); //insertId
                }
            );
        });
    },
    alterar:(id, title, body, date)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE post SET title = ?, body = ?, date = ? WHERE id = ?',
                [title, body, date, id],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (id)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM post WHERE id = ?',[id], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};


