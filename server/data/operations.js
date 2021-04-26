// Database import
const database = require('../infra/database');

// Create operation data handling
exports.createOperation = (operationData) => {
   return database.one(
      'INSERT INTO app.operation (tradetype, income, rate, userid) VALUES ($1, $2, $3, $4) RETURNING *',
      [
         operationData.tradetype,
         operationData.income,
         operationData.rate,
         operationData.userid,
      ]
   );
};

// Delete operation data handling
exports.deleteOperation = (id) => {
   return database.none('DELETE FROM app.operation WHERE id = $1', [id]);
};
