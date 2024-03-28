const { parentPort } = require('worker_threads');

parentPort.on('message', (msg) => {
  const { port } = msg;
  port.postMessage(1); // notify worker1 that worker2 is ready
  port.on('message', (message) => {
    console.log('LOGGER SERVICE : ', message);
    process.exit();
  });
});
