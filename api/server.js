const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Caminho absoluto para o arquivo db.json
const filePath = path.join(__dirname, 'db.json');

// Lendo e parseando o arquivo db.json
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

// Criando uma instância do servidor json-server
const server = jsonServer.create();

// Middleware padrão do json-server
const middlewares = jsonServer.defaults();

// Adicionando middlewares ao servidor
server.use(middlewares);

// Roteamento com o arquivo db.json
const router = jsonServer.router(db); // Use db, não 'db.json'
server.use(router);

// Adicionando rewriter para personalizar rotas
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id/show'
}));

// Definindo porta para o servidor escutar
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// Exportando o servidor para uso externo
module.exports = server;
