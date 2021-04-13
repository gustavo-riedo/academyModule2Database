const express = require('express');
const router = express.Router();

const operationServices = require('../services/operations');

router.post('/', async (req, res) => {
   const operationData = req.body;
   const createdOperation = operationServices.createOperation(operationData);
   res.json(createdOperation);
});

router.delete('/:id', async (req, res) => {
   const deletedOperation = await operationServices.deleteOperation(
      req.params.id
   );
   res.json(deletedUser);
});

module.exports = router;