const operationData = require('../data/operations');
const { getUserByID, updateWallet } = require('./users');

exports.createOperation = async (data) => {
   if (data.tradetype == '' || data.income <= 0 || data.userid == '')
      throw new Error('Invalid data');

   const userData = await getUserByID(data.userid);

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
   console.log(newBalance);
   await updateWallet(newBalance, data.userid);
   return operationData.createOperation(data);
};

exports.deleteOperation = (id) => {
   return operationData.deleteOperation(id);
};
