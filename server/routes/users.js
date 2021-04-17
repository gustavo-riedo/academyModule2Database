const express = require('express');
const router = express.Router();

const usersService = require('../services/users');

router.get('/', async (req, res) => {
   try {
      const users = await usersService.getUsers();
      res.status(200).json(users);
   } catch (e) {
      res.status(400).send(e.message);
   }
});

router.get('/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      const userData = await usersService.getUserByID(userId);
      res.status(200).json(userData);
   } catch (e) {
      res.status(404).send(e.message);
   }
});

router.get('/history/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      const history = await usersService.getUserHistory(userId);
      res.status(200).json(history);
   } catch (e) {
      res.status(404).send(e.message);
   }
});

router.post('/', async (req, res) => {
   const userData = req.body;

   try {
      const createdUser = await usersService.createUser(userData);
      res.status(201).json(createdUser);
   } catch (e) {
      res.status(400).send(e.message);
   }
});

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

router.delete('/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      await usersService.deleteUser(userId);
      res.status(200).send();
   } catch (e) {
      res.status(404).send(e.message);
   }
});

module.exports = router;
