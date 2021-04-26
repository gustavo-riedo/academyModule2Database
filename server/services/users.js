// Internal imports
const usersData = require('../data/users');

// Get users data services
exports.getUsers = () => {
   return usersData.getUsers();
};

// Get user data services
exports.getUserByID = async (id) => {
   const post = await usersData.getUserByID(id);
   if (!post) throw new Error('User not found');
   return post;
};

// Get user history data services
exports.getUserHistory = async (id) => {
   await exports.getUserByID(id);
   return usersData.getUserHistory(id);
};

// Create user data services
exports.createUser = (user) => {
   return usersData.createUser(user);
};

// Modify wallet data services
exports.updateWallet = async (newBalance, id) => {
   await exports.getUserByID(id);

   if (newBalance.accbalanceusd < 0 || newBalance.accbalancegbp < 0)
      throw new Error('Invalid value');

   return usersData.updateWallet(newBalance, id);
};

// Delete user data services
exports.deleteUser = async (id) => {
   await exports.getUserByID(id);
   return usersData.deleteUser(id);
};
