const writeFile = require('fs').writeFile;
require('dotenv').config();

let apiURL = process.env.API_URL || '';

const targetPathProd = `./src/environments/environment.ts`;
const envConfigFile = `
export const environment = {
    production: true,
    apiUrl: '${apiURL}'
};

`;

writeFile(targetPathProd, envConfigFile, (err: any) => {
  if (err) {
    console.log(err);
  }
});
