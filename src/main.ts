import { Application } from './app';

const app = Application.getInstance();
app.bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

