var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://TongZhang:zt1993921@ds059316.mlab.com:59316/mytasklist_zt', ['tasks']);

//Get All Tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);

	})
});

//Get a Single Task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);

	})
});

//Save a Task
router.post('/task', function(req, res, next){
	var task = req.body;
	if(!task.title || !(task.isDone + '')){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}
});

//Delete a Single Task
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectID(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);

	})
});

//Update a Single Task
router.put('/task/:id', function(req, res, next){
	var task = req.body;
	var updTask = {};

	if(task.isDone){
		updTask.isDone = task.is
	}

	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else{
		db.tasks.update({_id: mongojs.ObjectID(req.params.id)}, updTask, {}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);

		});
	}	
});


module.exports = router;