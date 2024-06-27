const Router = require('express');
const exercisetrackerController = require('./controllers/ExerciseTrackerController');

const router = new Router();

// health endpoint 
router.get("/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

router.get('/api/users', exercisetrackerController.getUsersList);
router.get('/api/users/:id/logs', exercisetrackerController.getUserLogs);

router.post('/api/users', exercisetrackerController.createUser);
router.post('/api/users/:id/exercises', exercisetrackerController.createUserExercise);

router.delete('/api/users', exercisetrackerController.dropCollection);

module.exports = router;
