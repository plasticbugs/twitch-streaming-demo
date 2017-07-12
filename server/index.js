require('dotenv').config();
var app = require('./app');
const PORT = process.env.PORT || 3000

app.listen(PORT);

console.log(`Serving up fresh HTML on port ${PORT}`);