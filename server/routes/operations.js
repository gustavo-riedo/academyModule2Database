const express = require('express');
const router = express.Router();
const { postQueue } = require('../queues/index');

const operationServices = require('../services/operations');

router.post('/', async (req, res) => {
   const operationData = req.body;
   operationData.service = 'op';
   postQueue.add({ service: operationData });
   return res.status(200).json({
      message:
         'Your advert has been submitted successfully, operation created!',
   });
});

router.delete('/:id', async (req, res) => {
   const deletedOperation = await operationServices.deleteOperation(
      req.params.id
   );
   res.status(200).json(deletedOperation);
});

module.exports = router;
