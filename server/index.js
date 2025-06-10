const express = require('express');
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' })
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})