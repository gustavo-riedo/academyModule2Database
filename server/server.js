const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', require('./routes/users'));
app.use('/operations', require('./routes/operations'));

app.listen(5000, () => {
   console.log('Database server running!');
});
