// External imports
const crypto = require('crypto');
const axios = require('axios');

// Internal imports
const userServices = require('../services/users');
const operationServices = require('../services/operations');

const generateData = () => {
   return crypto.randomBytes(20).toString('hex');
};

test('Should get users', async () => {
   // Test data
   const user1 = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });
   const user2 = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });
   const user3 = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });

   // Test process
   const response = await axios.get('http://localhost:5000/users');
   const users = response.data;

   // Test condition
   expect(users).toHaveLength(3);

   // Test cleaning
   await userServices.deleteUser(user1.id);
   await userServices.deleteUser(user2.id);
   await userServices.deleteUser(user3.id);
});

test('Should get a user by ID', async () => {
   // Test data
   const user = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });

   // Test process
   const response = await axios.get('http://localhost:5000/users/' + user.id);
   const users = response.data;

   // Test condition
   expect(users).toHaveLength(1);

   // Test cleaning
   await userServices.deleteUser(user.id);
});

test('Should create users', async () => {
   // Test data
   const userData = {
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   };

   // Test process
   const response = await axios.post('http://localhost:5000/users', userData);
   const createdUser = response.data;

   // Test condition
   expect(createdUser.username).toBe(userData.username);
   expect(createdUser.email).toBe(userData.email);
   expect(createdUser.pswrd).toBe(userData.pswrd);

   // Test cleaning
   await userServices.deleteUser(createdUser.id);
});

test('Should update users wallet', async () => {
   // Test data
   const user = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });
   const newBalance = {
      accbalanceusd:
         Math.floor(Math.floor(Math.random() * (1000000 - 0) + 0)) / 100,
      accbalancegbp:
         Math.floor(Math.floor(Math.random() * (1000000 - 0) + 0)) / 100,
   };

   // Test process
   const response = await axios.patch(
      'http://localhost:5000/users/' + user.id,
      newBalance
   );
   const userUSDbal = response.data.accbalanceusd;
   const userGBPbal = response.data.accbalancegbp;

   // Test condition
   expect(userUSDbal).toBe(String(newBalance.accbalanceusd));
   expect(userGBPbal).toBe(String(newBalance.accbalancegbp));

   // Test cleaning
   await userServices.deleteUser(user.id);
});

test('Should delete users', async () => {
   // Test data
   const user = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });

   // Test process
   const response = await axios.delete(
      'http://localhost:5000/users/' + user.id
   );
   const users = response.data;

   // Test condition
   expect(users).toBe(null);
});

test('Should get a user history', async () => {
   // Test data
   const user = await userServices.createUser({
      username: generateData(),
      email: generateData(),
      pswrd: generateData(),
   });
   const operation1 = await operationServices.createOperation({
      tradetype: generateData(),
      income: Math.floor(Math.floor(Math.random() * (10000 - 0) + 0)) / 100,
      rate: Math.floor(Math.floor(Math.random() * (10 - 0) + 0)) / 100000,
      userid: user.id,
   });
   const operation2 = await operationServices.createOperation({
      tradetype: generateData(),
      income: Math.floor(Math.floor(Math.random() * (10000 - 0) + 0)) / 100,
      rate: Math.floor(Math.floor(Math.random() * (10 - 0) + 0)) / 100000,
      userid: user.id,
   });
   const operation3 = await operationServices.createOperation({
      tradetype: generateData(),
      income: Math.floor(Math.floor(Math.random() * (10000 - 0) + 0)) / 100,
      rate: Math.floor(Math.floor(Math.random() * (10 - 0) + 0)) / 100000,
      userid: user.id,
   });

   // Test process
   const response = await axios.get(
      'http://localhost:5000/users/history/' + user.id
   );
   const history = response.data;

   // Test condition
   expect(history).toHaveLength(3);

   // Test cleaning
   await operationServices.deleteOperation(operation1.id);
   await operationServices.deleteOperation(operation2.id);
   await operationServices.deleteOperation(operation3.id);
   await userServices.deleteUser(user.id);
});
