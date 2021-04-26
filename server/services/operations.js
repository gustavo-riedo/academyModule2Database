// Internal imports
const operationData = require('../data/operations');
const { getUserByID, updateWallet } = require('./users');

// Create operation services
exports.createOperation = async (data) => {
   // Trade must have valid values
   if (data.tradetype == '' || data.income <= 0 || data.userid == '')
      throw new Error('Invalid data');

   const userData = await getUserByID(data.userid); // Get the targeted user

   // Select between both trade types
   if (
      data.tradetype == 'USD to GBP' &&
      userData.accbalanceusd < Number(data.income)
   )
      throw new Error('Not enough balance');
   if (
      data.tradetype == 'GBP to USD' &&
      userData.accbalancegbp < Number(data.income)
   )
      throw new Error('Not enough balance');

   // Modify user wallet after the trade
   var newBalance;
   if (data.tradetype == 'USD to GBP') {
      newBalance = {
         accbalanceusd: Number(userData.accbalanceusd) - Number(data.income),
         accbalancegbp:
            Number(userData.accbalancegbp) +
            Number(data.income) * Number(data.rate),
      };
   }
   if (data.tradetype == 'GBP to USD') {
      newBalance = {
         accbalanceusd:
            Number(userData.accbalanceusd) +
            Number(data.income) * Number(data.rate),
         accbalancegbp: Number(userData.accbalancegbp) - Number(data.income),
      };
   }
   await updateWallet(newBalance, data.userid);
   return operationData.createOperation(data);
};

// Delete operation services
exports.deleteOperation = (id) => {
   return operationData.deleteOperation(id);
};
