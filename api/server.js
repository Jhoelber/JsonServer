const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const filePath = path.join(__dirname, 'db.json'); // Use __dirname para obter o diretório atual corretamente
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db); // Crie o roteador com os dados do arquivo JSON

server.use(cors()); // Habilita o CORS para todas as origens
app.use(cors());
server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Middleware para permitir operações de escrita apenas na rota '/Usuario'
server.use('/Usuario', (req, res, next) => {
    if (req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE') {
        // Aqui você pode implementar lógicas de autenticação, autorização, etc.
        // Por exemplo:
        // if (!req.headers.authorization) {
        //     return res.status(401).send('Unauthorized');
        // }
        next(); // Passa para o próximo middleware se for uma operação de escrita
    } else {
        res.sendStatus(404); // Responde com 404 para outros métodos não suportados
    }
});

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

module.exports = server;
