const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(express.static(publicDirectory, { maxAge: '1h' }));

app.get('*', (_request, response) => {
  response.sendFile(path.join(publicDirectory, 'index.html'));
});

app.listen(port, () => {
  console.log(`Sean's Photography is running at http://localhost:${port}`);
});
