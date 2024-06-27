require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  logs: [{
    description: String,
    duration: Number,
    date: String
  }]
});

let User = mongoose.model('User', userSchema);

class ExerciseTrackerController {

  async getUsersList(req, res) {
    try {
      console.log(`ExerciseTrackerController.getUsersList : REQUEST--> ${JSON.stringify(req.body)}`);
      User.find(function(err, data) {
        if (err) throw new Error({message: err.message});
        res.json(data);
      });
    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }

  async createUser(req, res) {
    try {
      console.log(`ExerciseTrackerController.createUser : REQUEST--> ${JSON.stringify(req.body)}`);
      const { username } = req.body;
      let newUser = new User({
        username
      });
      newUser.save(function(err, data) {
        if (err) throw new Error({message: err.message});
        res.json({ 
          username: data.username, 
          _id: data._id
        });
      });
    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }

  async createUserExercise(req, res) {
    try {
      console.log(`ExerciseTrackerController.createUserExercise : REQUEST--> ${JSON.stringify(req.params)}
       & ${JSON.stringify(req.body)}`);
      const { id } = req.params;
      let { description, duration, date } = req.body;
      date = date ? new Date(date).toDateString() : new Date().toDateString();
      User.findById({_id: id}, function(err, data) {
        if (err) return console.error(err);
        if (data == undefined) return console.error('not found');
        data.logs.push({
          description,
          duration,
          date
        });
        data.save(function(err, data) {
          if (err) return console.error(err);
          res.json({
            _id: data._id,
            username: data.username,
            date,
            duration: Number(duration),
            description
          })
        });
      });
    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }

  async getUserLogs(req, res) {
    try {
      console.log(`ExerciseTrackerController.getUserLogs : REQUEST--> ${JSON.stringify(req.params)}
       & ${JSON.stringify(req.query)}`);
      const { id } = req.params;
      const { from, to, limit } = req.query;
      User.findById({_id: id})
      .exec(function(err, data) {
        try {
          if (err) throw new Error(err);
          if (data == undefined) throw new Error('not found');
          let { _id, username, logs } = data;
          if (from || to) {
            logs = logs.filter(log => {
              const logDate = new Date(log.date).getTime();
              const fromDate = from ? new Date(from).getTime() : 0;
              const toDate = to ? new Date(to).getTime() : Date.now();
              return logDate >= fromDate && logDate <= toDate;
            });
          }
          if (limit) {
            logs = logs.slice(0, limit);
          }    
          res.json({ 
            _id,
            username,
            count: logs.length,
            log: logs
          });
        } catch (error) {
            console.error(`error:${error}`);
            res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
          }
      });
    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }

  async dropCollection(req, res) {
    try {
      console.log(`ExerciseTrackerController.dropCollection : REQUEST--> ${JSON.stringify(req.body)}`);
      User.remove({}, function(err, data) {
        if (err) return console.error(err);
        res.json({ 
          data
        });
      });
    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }

}

module.exports = new ExerciseTrackerController();
