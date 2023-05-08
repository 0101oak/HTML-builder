// const fsPromise = require('fs/promises');
const fs = require('fs')
const path = require('path');
const styles = path.resolve(__dirname, 'styles');
const bundle = path.resolve(__dirname, 'project-dist', 'bundle.css');

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