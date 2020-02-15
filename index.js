'use strict';
import { server } from './src/server';

const app = server();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
