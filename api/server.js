const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db.json'); // Use __dirname para obter o diretório atual corretamente
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db); // Crie o roteador com os dados do arquivo JSON

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(jsonServer.bodyParser); // Adicione o bodyParser para lidar com JSON no corpo das requisições

// Rota para lidar com operações de escrita (PUT, POST, DELETE)
server.use('/Usuario', (req, res, next) => {
    if (req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE') {
        // Implemente sua lógica de verificação de autorização, autenticação, etc. aqui, se necessário
        next();
    } else {
        res.sendStatus(404); // Responda com 404 para outros métodos não suportados
    }
});

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

module.exports = server;
