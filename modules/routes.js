var Todo = require('./models/todo');

function getTodos(res, updated) {
    Todo.find(function(err, todos) {
        if (err)
            res.send(err)
        res.json(todos); 
    });
};

module.exports = function(app, mongoose, connection) {
    app.get('/api/todos', function(req, res) {
        getTodos(res);
    });

    app.post('/api/todos', function(req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);
            getTodos(res);
        });

    });
    app.put('/api/todos/:todo_id', function(req, res) {
        console.log('req.body: ', req.body);
        if (req.body.length > 0) {
            var ids = [];
            for (var i = 0; i < req.body.length; i++) {
                ids.push(req.body[i]._id);
            }
            Todo.update({
                _id: {
                    $in: ids
                }
            }, {
                $set: {
                    'done': true
                }
            }, {
                multi: true
            }, function(err, todo) {
                if (err) res.send(err);
                getTodos(res, true);
            });

        } else {
            Todo.update({
                _id: req.params.todo_id
            }, {
                'text': req.body.text,
                'done': req.body.done,
                'checked': req.body.checked
            }, function(err, todo) {
                if (err) res.send(err);
                //res.json(todo);
                getTodos(res, true);
            });
        }


    });
    app.delete('/api/todos/', function(req, res) {
        Todo.remove({
            _id: {
                $in: req.body
            }
        }, function(err, todo) {
            if (err) res.send(err);
            //res.json(todo);
            getTodos(res, true);
        });
    });
    app.get('*', function(req, res) {
        res.sendfile('index.html'); 
    });
};
