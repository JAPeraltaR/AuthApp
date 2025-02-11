const { writeFileSync, mkdirSync } = require('fs');
const dotenv = require('dotenv').config();
const other = dotenv.parsed;

const targetPath ='./src/environments/environments.ts';
mkdirSync( './src/environments', { recursive: true } );

const fileEnv = Object.entries(other).map( ([keys, value]) => `${keys}: '${value}'` )
const envContent = `
  export const environments = {
    ${fileEnv}
  };
`;

writeFileSync( targetPath, envContent );


const templateEnv = Object.keys(other).map( keys => `${keys}=`).join('\n');
writeFileSync('./.env.template', templateEnv);



