const fs = require('fs');
const path = require('path');
const secretFolder = path.resolve(__dirname, 'secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);

  files.forEach(file => {
    if (file.isFile) {
      const ROUTE = path.resolve(secretFolder, file.name);
      const EXTENSION = path.extname(file.name);
      const NAME = path.basename(file.name, `${EXTENSION}`);
      fs.stat(ROUTE, (err, stats) => {
        if (err) console.log(error);
      const SIZE = `${stats.size}`;
        console.log(`${EXTENSION} ${NAME} ${SIZE}`);
      });
    }
  });
});



