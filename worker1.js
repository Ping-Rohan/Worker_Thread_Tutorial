const { parentPort } = require('worker_threads');

parentPort.on('message', (msg) => {
  const { port, start, end } = msg;
  port.on('message', (message) => {
    const sum = performCpuTask(start, end);
    port.postMessage(sum);
    console.log('WORKER_1 FINISHED ITS TASK');
    process.exit();
  });
});

function performCpuTask(start, end) {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  return sum;
}
