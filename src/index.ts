import express = require('express');

import { initRoutes } from './api/routers';
import config from './config';

const PORT = config.port;
const app = express();

app.use(express.json());
initRoutes(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
