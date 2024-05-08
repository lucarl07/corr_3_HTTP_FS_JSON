/** Module: readRecipeData **/

// Native modules:
import fs from "node:fs";

// Function for reading recipe data:
const readRecipeData = (callback) => {
  fs.readFile('./recipes.json', 'utf8', (err, data) => {
    if (err) callback(err)

    try {
      const recipes = JSON.parse(data)
      callback(null, recipes);
    } catch (error) {
      callback(error)
    }
  });
}

// Exporting the function as a module:
export default readRecipeData;