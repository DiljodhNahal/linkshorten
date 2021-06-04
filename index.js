const app = require('./app');

// Define Port
const port = process.env.PORT || 5000;

// Start Express Server
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
