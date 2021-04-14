const express = require('express');
const router = express.Router();

const usersService = require('../services/users');

router.get('/', async (req, res) => {
   const users = await usersService.getUsers();
   res.json(users);
});

router.get('/:id', async (req, res) => {
   const user = await usersService.getUserByID(req.params.id);
   res.json(user);
});

router.get('/history/:id', async (req, res) => {
   const history = await usersService.getUserHistory(req.params.id);
   res.json(history);
});

router.post('/', async (req, res) => {
   const userData = req.body;
   const createdUser = await usersService.createUser(userData);
   res.json(createdUser);
});

router.patch('/:id', async (req, res) => {
   const newBalance = req.body;
   const updatedUser = await usersService.updateWallet(
      newBalance,
      req.params.id
   );
   res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
   const deletedUser = await usersService.deleteUser(req.params.id);
   res.json(deletedUser);
});

module.exports = router;
