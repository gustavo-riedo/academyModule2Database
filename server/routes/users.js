// External imports
const express = require('express');
const router = express.Router();

// Internal imports
const { postQueue } = require('../queues/');
const usersService = require('../services/users');

// Get all users route
router.get('/', async (req, res) => {
   try {
      const users = await usersService.getUsers();
      res.status(200).json(users);
   } catch (e) {
      res.status(400).send(e.message);
   }
});

// Get user by ID route
router.get('/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      const userData = await usersService.getUserByID(userId);
      res.status(200).json(userData);
   } catch (e) {
      res.status(404).send(e.message);
      error: err;
   }
});

// Get user history route
router.get('/history/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      const history = await usersService.getUserHistory(userId);
      res.status(200).json(history);
   } catch (e) {
      res.status(404).send(e.message);
   }
});

// Create user route
router.post('/', async (req, res) => {
   const userData = req.body;
   operationData.service = 'user';

   try {
      postQueue.add({ service: userData, slug }); // Add request to the queue

      return res.status(200).json({
         message: 'Your advert has been submitted successfully, user created!',
      });
   } catch (err) {
      return res.status(422).json({
         message: 'There was an unexpected error submitting your advert.',
      });
   }
});

// Change user wallet route
router.patch('/:id', async (req, res) => {
   const newBalance = req.body;
   const userId = req.params.id;

   try {
      const updatedUser = await usersService.updateWallet(newBalance, userId);
      res.status(201).json(updatedUser);
   } catch (e) {
      if (e.message == 'User not found') {
         res.status(404).send(e.message);
      } else if (e.message == 'Invalid value') {
         res.status(400).send(e.message);
      }
   }
});

// Delete user route
router.delete('/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      await usersService.deleteUser(userId);
      res.status(200).send();
   } catch (e) {
      res.status(404).send(e.message);
   }
});

// Exports
module.exports = router;
