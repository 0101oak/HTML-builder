const fsPromise = require('fs/promises');
const path = require('path');
const FILES = path.resolve(__dirname, 'files')
const COPY = path.resolve(__dirname, 'files-copy');


function copyDir() {
  fsPromise.rm(COPY, { recursive: true, force: true })
   .then( () => {
     fsPromise.mkdir(COPY, { recursive: true });
  })
  .then( () => {
    return fsPromise.readdir(FILES, { withFileTypes: true });
  })
  .then ( (files) => {
    files.forEach(file => {
      if (file.isFile()) {
        const copy = path.resolve(FILES, file.name);
        const copied = path.resolve(COPY, file.name);
        fsPromise.copyFile(copy, copied);
      }
    });
  });
}

copyDir()
