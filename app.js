'use strict';

const io = require('socket.io-client');

const numSocket = io.connect('http://localhost:3000/numbers');
const letSocket = io.connect('http://localhost:3000/letters');

setInterval( () => {
  numSocket.emit('next-number');
}, 300);

setInterval( () => {
  letSocket.emit('next-letter');
}, 600);