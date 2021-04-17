const express = require('express');
const router = express.Router();

const operationServices = require('../services/operations');

router.post('/', async (req, res) => {
   const operationData = req.body;

   try {
      const createdOperation = await operationServices.createOperation(
         operationData
      );
      res.status(201).json(createdOperation);
   } catch (e) {
      if (e.message == 'User not found') {
         res.status(404).send(e.message);
      } else {
         res.status(400).send(e.message);
      }
   }
});

router.delete('/:id', async (req, res) => {
   const deletedOperation = await operationServices.deleteOperation(
      req.params.id
   );
   res.status(200).json(deletedOperation);
});

module.exports = router;
