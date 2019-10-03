module.exports = app => {
  const users = require('../controllers/users.controller.js');

  // Create a new User
  app.post('/users', users.create);

  // Retrieve all Users
  app.get('/users', users.findAll);

  // Retrieve a single User with userId
  app.get('/users/:userId', users.findById);

  //Retrieve a user by name
  app.get('/users/username/:username', users.findByName)

  // Update a User with userId
  app.put('/users/:userId', users.update);

  // Delete a User with userId
  app.delete('/users/:userId', users.delete);
};
