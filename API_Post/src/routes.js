const express = require('express');
const router = express.Router();

const PostController = require('./controllers/PostController');

router.get('/posts', PostController.buscarTodos);
router.get('/post/:id', PostController.buscarUm);
router.post('/post', PostController.inserir);
router.put('/post/:id', PostController.alterar);
router.delete('/post/:id', PostController.excluir);

module.exports = router;

