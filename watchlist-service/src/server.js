require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5003;

// Connect to Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Watchlist Service listening on port ${PORT}`);
  });
});
