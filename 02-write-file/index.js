const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.resolve(__dirname, 'output.txt'));
stdout.write('Enter your message\n');
let message = '';

stdin.on('data', data => {
  if (data.toString().trim() == 'exit') {
    message = 'Good bye';
    stdout.write(`${message}`);
    exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  message = 'Good bye';
  stdout.write(`${message}`);
  exit();
});

