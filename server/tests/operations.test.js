const crypto = require('crypto');
const axios = require('axios');
const operationServices = require('../services/operations');
const userServices = require('../services/users');

const generateData = () => {
   return crypto.randomBytes(20).toString('hex');
};

test('Should create operations', async () => {
   // Test data
   const user = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });

   const operationData = {
      tradetype: generateData(),
      income: Math.floor(Math.floor(Math.random() * (10000 - 0) + 0)) / 100,
      rate: Math.floor(Math.floor(Math.random() * (25 - 0) + 0)) / 100,
      userid: user.id,
   };

   // Test process
   const response = await axios.post(
      'http://localhost:3000/operations',
      operationData
   );
   const createdOperation = response.data;

   // Test condition
   expect(createdOperation.tradetype).toBe(operationData.tradetype);
   expect(createdOperation.income).toBe(String(operationData.income));
   expect(createdOperation.rate).toBe(String(operationData.rate));

   // Test cleaning
   await operationServices.deleteOperation(createdOperation.id);
   await userServices.deleteUser(user.id);
});
