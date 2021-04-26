// External imports
const Queue = require('bull');

// Internal imports
const usersService = require('../services/users');
const operationServices = require('../services/operations');

// Queue object
const postQueue = new Queue('postQueue', process.env.REDIS_URL);

// Queue process fucntion (run everytime a queue item is processed).
postQueue.process(async (job) => {
   const { service } = job.data; // Queue item data

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

// Exports
module.exports = { postQueue };
