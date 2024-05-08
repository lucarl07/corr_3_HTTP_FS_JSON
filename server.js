import { createServer } from "http";
import { URLSearchParams } from "url";
import fs from "node:fs";

const PORT = 5050 || 5085

const server = createServer((req, res) => {
  const {method, url} = req;

  const writeResponse = (status, resEnd = "", message = "Task finished successfully!") => {
    res.writeHead(status, { "Content-Type": "application/json" })
    res.end(JSON.stringify(resEnd))
    return console.log(message + '\n');
  }

  if (method === 'GET' && url === '/receitas') {
    res.end(`${method} ${url}`)
  } else if (method === 'POST' && url === '/receitas') {
    res.end(`${method} ${url}`)
  } else if (method === 'PUT' && url.startsWith('/receitas/')) {
    res.end(`${method} ${url}`)
  } else if (method === 'DELETE' && url.startsWith('/receitas/')) {
    res.end(`${method} ${url}`)
  } else if (method === 'GET' && url.startsWith('/receitas/')) {
    res.end(`${method} ${url}`)
  } else if (method === 'GET' && url === '/categorias') {
    res.end(`${method} ${url}`)
  } else if (method === 'GET' && url.startsWith('/busca')) {
    res.end(`${method} ${url}`)
  } else if (method === 'GET' && url === '/ingredientes') {
    res.end(`${method} ${url}`)
  } else {
    writeResponse(404, {
      mensagem: "Página não encontrada. Por favor, verifique a URL e o método HTTP utilizado."
    }, 'The endpoint was not found.')
  }
})

server.listen(PORT, () => {
  console.clear();
  console.log(`Welcome to the DevReceitas API! \nVersion: Alpha 0.2.0 ⚙️ \nServer on PORT: ${PORT} 🚀 \n`);
  console.log(`Check all the recipes on: \nGET http://localhost:5050/receitas \n`);
})