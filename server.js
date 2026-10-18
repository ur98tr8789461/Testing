const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(express.static(publicDirectory, { maxAge: '1h' }));

app.use((_request, response) => {
  response.status(404).type('text').send('Not found');
});

app.listen(port, () => {
  console.log(`Sean's Photography is running at http://localhost:${port}`);
});
