const express = require('express');
const app = express();

app.use(express.json());
app.use('/users', require('./routes/users'));
app.use('/operations', require('./routes/operations'));

app.listen(3000, () => {
   console.log('Database server running!');
});
