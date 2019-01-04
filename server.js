'use strict';

const io = require('socket.io')(3000);

let counter = 0;
let letter = 'A';
let n = 1;

const numbers = io.of('/numbers');
const letters = io.of('/letters');

numbers.on('connection', (socket) => {
  console.log('Welcome to Numbers!');  

  socket.on('join', (room, callback) => {
    socket.join(room);
    callback && callback(`Joined ${room}`);
  });
  
  socket.on('next-number', () => {
    socket.broadcast.emit('number', counter);
    socket.in('negative').broadcast.emit('_number', -counter);
    counter++;
  });
});

letters.on('connection', (socket) => {
  console.log('Welcome to Letters!');

  socket.on('join', (room, callback) => {
    socket.join(room);
    callback && callback(`Joined ${room}`);
  });

  socket.on('next-letter', () => {
    socket.broadcast.emit('letter', letter);
    socket.in('lowercase').broadcast.emit('_letter', letter.toLowerCase());
    if (n > 25) {
      n = 0;
    }
    letter = String.fromCharCode(65 + n);
    n++;
  });
});
