const { spawn } = require('child_process');
const net = require('net');

const args = new Set(process.argv.slice(2));
const shouldOpenBrowser = !args.has('--no-open');
const preferredPort = Number(process.env.PORT || 3000);
const serverBin = require.resolve('http-server/bin/http-server');

function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const tester = net.createServer();

      tester.once('error', () => {
        tester.close();
        if (port >= startPort + 20) {
          reject(new Error(`No free port found near ${startPort}`));
          return;
        }
        tryPort(port + 1);
      });

      tester.once('listening', () => {
        tester.close(() => resolve(port));
      });

      tester.listen(port, '0.0.0.0');
    };

    tryPort(startPort);
  });
}

async function main() {
  const port = await findAvailablePort(preferredPort);
  const child = spawn(process.execPath, [serverBin, '.', '-p', String(port), '-c-1', ...(shouldOpenBrowser ? ['-o'] : [])], {
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});