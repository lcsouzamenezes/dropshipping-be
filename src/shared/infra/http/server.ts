import { app } from './app';
import config from '@config/app';

const { port } = config;

app.listen(port, () => {
  console.log(`🚀 server running on port: ${port}`);
});
