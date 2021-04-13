const database = require('../infra/database');

exports.getUsers = () => {
   return database.query('SELECT * FROM app.user');
};

exports.getUserByID = (id) => {
   return database.query('SELECT * FROM app.user WHERE id = $1', [id]);
};

exports.createUser = (user) => {
   return database.one(
      'INSERT INTO app.user (username, email, pswrd) values ($1, $2, $3) RETURNING *',
      [user.username, user.email, user.pswrd]
   );
};

exports.updateWallet = (newBalance, id) => {
   return database.one(
      'UPDATE app.user SET accbalanceusd = $1, accbalancegbp = $2 WHERE id = $3 returning *',
      [newBalance.accbalanceusd, newBalance.accbalancegbp, id]
   );
};

exports.deleteUser = (id) => {
   return database.none('DELETE FROM app.user WHERE id = $1', [id]);
};
