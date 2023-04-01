const PostService = require('../services/PostService');

module.exports = {
    
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let resultPosts = await PostService.buscarTodos();

        for(let i in resultPosts){
            json.result.push({
                id: resultPosts[i].id,
                title: resultPosts[i].title,
                body: resultPosts[i].body,
                date: resultPosts[i].date
            });
        }

        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.id; //para pegar o parametro
        let postNoticia = await PostService.buscarUm(codigo);

        if(postNoticia){
            json.result = postNoticia; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let title = req.body.title;
        let body = req.body.body;
        let date = req.body.date

        if (title && body && date){
            let PostCodigo = await PostService.inserir(title, body, date);
            json.result = {
                id: PostCodigo,
                title, 
                body, 
                date
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let id = req.params.id;
        let title = req.body.title;
        let body = req.body.body;
        let date = req.body.date

        if (id && title && body && date){
            await PostService.alterar(id, title, body, date);
            json.result = {
                id, 
                title, 
                body, 
                date
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    
    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await PostService.excluir(req.params.id);
        
        res.json(json);
    },



}


