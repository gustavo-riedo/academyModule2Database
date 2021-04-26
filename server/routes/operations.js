// External imports
const express = require('express');
const router = express.Router();

// Internal imports
const { postQueue } = require('../queues/index');
const operationServices = require('../services/operations');

// Create operation route
router.post('/', async (req, res) => {
   const operationData = req.body;
   operationData.service = 'op';
   postQueue.add({ service: operationData }); // Add operation to the queue
   return res.status(200).json({
      message:
         'Your advert has been submitted successfully, operation created!',
   });
});

// Delete operation route
router.delete('/:id', async (req, res) => {
   const deletedOperation = await operationServices.deleteOperation(
      req.params.id
   );
   res.status(200).json(deletedOperation);
});

// Exports
module.exports = router;
