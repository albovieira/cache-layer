const fs = require('fs-extra');

console.log('Copying distribution files...');

fs.copy('package.json', 'dist/package.json')
  .then(c => console.log('Package.json succesfully copied!'))
  .catch(e => console.log(`Error copying package.json, Details: ${e}`));

fs.copy('.npmrc', 'dist/.npmrc')
  .then(c => console.log('.npmrc copied successfully!'))
  .catch(e => console.log(`Error copying .npmrc, Details: ${e}`));

fs.copy('README.md', 'dist/README.md')
  .then(c => console.log('README.md copied successfully!'))
  .catch(e => console.log(`Error copying README.md, Details: ${e}`));

console.log('Done! Package ready to publish.');
