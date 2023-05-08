const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const projectDist = path.resolve(__dirname, 'project-dist');
const template = path.resolve(__dirname, 'template.html');
const styles = path.resolve(__dirname, 'styles');
const bundle = path.resolve(projectDist, 'styles.css')
const bundleHtml = path.resolve(projectDist, 'index.html');
const assetsOrig = path.resolve(__dirname, 'assets');
const assetsCopy = path.resolve(projectDist, 'assets');
const components = path.resolve(__dirname, 'components');


function copyDir() {
  fsPromise.rm(assetsCopy, { recursive: true, force: true })
   .then( () => {
     fsPromise.mkdir(assetsCopy, { recursive: true });
  })
  .then( () => {
    return fsPromise.readdir(assetsOrig, { withFileTypes: true });
  })
  .then ( (files) => {
    files.forEach(file => {
      if (file.isFile()) {
        const copy = path.resolve(assetsOrig, file.name);
        const copied = path.resolve(assetsCopy, file.name);
        fsPromise.copyFile(copy, copied);
      }
    });
  });
}

function Bundle () {
  let write = fs.createWriteStream(bundle);
  fs.readdir(styles, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);

  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const items = path.resolve(__dirname, 'styles', file.name);
      fs.createReadStream(items).pipe(write);
    }
  });
});
}

// function bundleHTML() {
//   fs.readFile(template, 'utf8', (err, data) => {
//     if (err) console.log(err);
//     let file = data;
//     const extensions = path.extname(file.name);
//     if (extensions === '.html' );
//   })
// }

function builder (projectDist) {
  fsPromise.mkdir(projectDist, { recursive: true }).finally(() =>{
    copyDir();
    Bundle();
    // bundleHTML();
  });
}

builder(projectDist);