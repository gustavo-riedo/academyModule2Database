const Queue = require('bull');
const usersService = require('../services/users');
const operationServices = require('../services/operations');

const postQueue = new Queue('postQueue', process.env.REDIS_URL);

postQueue.process(async (job) => {
   const { service } = job.data;

   try {
      switch (service.service) {
         case 'user': {
            const response = await usersService.createUser(service);
            return Promise.resolve({ sent: true });
         }
         case 'op': {
            const response = await operationServices.createOperation(service);
            return Promise.resolve({ sent: true });
         }
         default: {
            return Promise.resolve({ sent: true });
         }
      }
   } catch (err) {
      return Promise.reject(err);
   }
});

module.exports = { postQueue };
