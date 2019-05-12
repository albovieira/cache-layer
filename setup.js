const fs = require('fs-extra');

console.log('Copiando arquivos de distribuição ...');

//Copy npm package to publish
fs.copy('package.json', 'dist/package.json')
  .then(c => console.log('Package.json copiado com sucesso!'))
  .catch(e => console.log(`Erro ao copiar o package.json, detalhe: ${e}`));

//Copy npm package to publish
fs.copy('.npmrc', 'dist/.npmrc')
  .then(c => console.log('.npmrc copiado com sucesso!'))
  .catch(e => console.log(`Erro ao copiar o .npmrc, detalhe: ${e}`));


console.log('Fim do build de arquivos de distribuição.');