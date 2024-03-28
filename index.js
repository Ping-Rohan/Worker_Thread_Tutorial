const { Worker, isMainThread, MessageChannel } = require('worker_threads');

if (isMainThread) {
  const worker1 = new Worker('./worker1.js');
  const worker2 = new Worker('./worker2.js');

  const { port1, port2 } = new MessageChannel();

  worker1.postMessage(
    {
      port: port1,
      start: 1,
      end: 50000000,
    },
    [port1]
  );
  worker2.postMessage({ port: port2 }, [port2]);

  port1.on('message', (message) => {
    port2.postMessage(message);
  });
}
