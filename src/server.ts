import { buildApp } from './app.js';

const { app, config } = buildApp();

app
  .listen({ host: config.host, port: config.port })
  .then(() => {
    app.log.info(`listening on ${config.host}:${config.port}`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
