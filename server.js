import { createServer } from "http";
import { URLSearchParams } from "url";
import readRecipeData from "./readRecipeData.js";
import writeRecipeData from "./writeRecipeData.js";

const PORT = 5050 || 5085

const server = createServer((req, res) => {
  // GETTING THE HTTP METHOD AND URL:
  const { method, url } = req;
  
  // WRITING A RESPONSE IN JSON FORMAT:
  const writeResponse = (status, resEnd = "", message = "Task finished successfully!") => {
    res.writeHead(status, { "Content-Type": "application/json" })
    res.end(JSON.stringify(resEnd))
    return console.log(message + '\n');
  }

  // ENDPOINTS:
  if (method === 'GET' && url === '/receitas') { // Get all recipes
    console.log(`${method} ${url}`)

    readRecipeData((error, recipes) => {
      if (error) writeResponse(500, { 
        mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
      }, 'An error ocurred while reading server data.');

      writeResponse(200, recipes)
    });
  } else if (method === 'POST' && url === '/receitas') { // Add a new recipe
    console.log(`${method} ${url}`)

    let body = "";

    req.on('data', (chunk) => { body += chunk });
    req.on('end', () => {
      const newRecipe = JSON.parse(body)

      readRecipeData((err, recipes) => {
        if (err) writeResponse(500, { 
          mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
        }, 'An error ocurred while reading server data.');

        newRecipe.id = recipes.length + 1
        recipes.push(newRecipe);

        writeRecipeData(recipes, (err) => {
          if (err) writeResponse(500, { 
            mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
          }, 'An error ocurred while reading server data.');

          writeResponse(201, newRecipe)
        });
      });
    });

  } else if (method === 'PUT' && url.startsWith('/receitas/')) { // Update an existing recipe
    console.log(`${method} ${url}`)

    const id = parseInt(url.split('/')[2])
    console.log(`ID: ${id}`)

    let body = '';

    req.on('data', (chunk) => { body += chunk });
    req.on('end', () => {
      const updtRecipe = JSON.parse(body)

      if (!body) writeResponse(400, {
        message: "O corpo da solicitação está vazio. Por favor, preencha-o com dados."
      }, 'Bad Request: empty body returned.');

      readRecipeData((err, recipes) => {
        if (err) writeResponse(500, { 
          mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
        }, 'An error ocurred while reading server data.');

        const index = recipes.findIndex(item => item.id === id);

        if (index === -1) writeResponse(404, { 
          mensagem: "Receita não encontrada. Por favor, verifique a ID inserida." 
        }, 'Recipe not found.');

        recipes[index] = {...updtRecipe, id: id}

        writeRecipeData(recipes, (err) => {
          if (err) writeResponse(500, { 
            mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
          }, 'An error ocurred while reading server data.');

          writeResponse(201, recipes[index])
        });
      });
    });

  } else if (method === 'DELETE' && url.startsWith('/receitas/')) { // Delete recipe
    console.log(`${method} ${url}`)

    const id = parseInt(url.split('/')[2])
    console.log(`ID: ${id}`)

    readRecipeData((err, recipes) => {
      if (err) writeResponse(500, { 
        mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
      }, 'An error ocurred while reading server data.');

      const index = recipes.findIndex(item => item.id === id);

      if (index === -1) writeResponse(404, { 
        mensagem: "Receita não encontrada. Por favor, verifique a ID inserida." 
      }, 'Recipe not found. It never existed, it seems...');

      recipes.splice(index, 1)

      writeRecipeData(recipes, (err) => {
        if (err) writeResponse(500, { 
          mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
        }, 'An error ocurred while reading server data.');

        writeResponse(201, {
          mensagem: `Receita ID: ${id} apagada com sucesso.`,
          dica: 'Acesse GET http://localhost:5050/receitas para ver as receitas restantes.'
        });
      });
    });
  } else if (method === 'GET' && url.startsWith('/receitas/')) { // Get a specific recipe
    console.log(`${method} ${url}`)
  } else if (method === 'GET' && url === '/categorias') { // Get a list of recipe types
    console.log(`${method} ${url}`)
  } else if (method === 'GET' && url.startsWith('/busca')) { // Search a recipe by terms
    console.log(`${method} ${url}`)
  } else if (method === 'GET' && url === '/ingredientes') { // Get a list of ingredients
    console.log(`${method} ${url}`)
  } else { // No endpoint matched
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