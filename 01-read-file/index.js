const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const readFile = fs.createReadStream(path.resolve(__dirname, 'text.txt'));
let data = ' ';
readFile.on('data', chunk => data += chunk);
readFile.on('end', () => stdout.write(data));





// console.log(path.resolve(__dirname, './test', '/second.html'));

// fs.readFile(
//   path.join(__dirname, 'notes', 'mynotes.txt'),
//   'utf-8',
//   (err, data) => {
//       if (err) throw err;
//       console.log(data);
//   }
// ); чтение файла