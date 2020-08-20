import express = require('express');

import { initRoutes } from './components';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
initRoutes(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
