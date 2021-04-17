const usersData = require('../data/users');

exports.getUsers = () => {
   return usersData.getUsers();
};

exports.getUserByID = async (id) => {
   const post = await usersData.getUserByID(id);
   if (!post) throw new Error('User not found');
   return post;
};

exports.getUserHistory = async (id) => {
   await exports.getUserByID(id);
   return usersData.getUserHistory(id);
};

exports.createUser = (user) => {
   return usersData.createUser(user);
};

exports.updateWallet = async (newBalance, id) => {
   await exports.getUserByID(id);

   if (newBalance.accbalanceusd < 0 || newBalance.accbalancegbp < 0)
      throw new Error('Invalid value');

   return usersData.updateWallet(newBalance, id);
};

exports.deleteUser = async (id) => {
   await exports.getUserByID(id);
   return usersData.deleteUser(id);
};
