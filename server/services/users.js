const usersData = require('../data/users');

exports.getUsers = () => {
   return usersData.getUsers();
};

exports.getUserByID = (id) => {
   return usersData.getUserByID(id);
};

exports.getUserHistory = (id) => {
   return usersData.getUserHistory(id);
};

exports.createUser = (user) => {
   return usersData.createUser(user);
};

exports.updateWallet = (newBalance, id) => {
   return usersData.updateWallet(newBalance, id);
};

exports.deleteUser = (id) => {
   return usersData.deleteUser(id);
};
