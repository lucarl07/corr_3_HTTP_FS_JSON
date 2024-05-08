/** writeRecipeData | by lucarl07 **/

// Native modules:
import fs from "node:fs";

// Function for writing data to the recipe file:
const writeRecipeData = (value, callback) => {
  fs.writeFile('./recipes.json', JSON.stringify(value, null, 2), 
    (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null);
      }
    }
  );
}

// Exporting the function as a module:
export default writeRecipeData;