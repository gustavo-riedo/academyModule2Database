// Database import
const database = require('../infra/database');

// Get users data handling
exports.getUsers = () => {
   return database.query('SELECT * FROM app.user');
};

// Get user data handling
exports.getUserByID = (id) => {
   return database.one('SELECT * FROM app.user WHERE id = $1', [id]);
};

// Get user history data handling
exports.getUserHistory = (id) => {
   return database.query('SELECT * FROM app.operation WHERE userid = $1', [id]);
};

// Create user data handling
exports.createUser = (user) => {
   return database.one(
      'INSERT INTO app.user (username, email, pswrd) values ($1, $2, $3) RETURNING *',
      [user.username, user.email, user.pswrd]
   );
};

// Update wallet data handling
exports.updateWallet = (newBalance, id) => {
   return database.one(
      'UPDATE app.user SET accbalanceusd = $1, accbalancegbp = $2 WHERE id = $3 returning *',
      [newBalance.accbalanceusd, newBalance.accbalancegbp, id]
   );
};

// Delete user data handling
exports.deleteUser = (id) => {
   return database.none('DELETE FROM app.user WHERE id = $1', [id]);
};
