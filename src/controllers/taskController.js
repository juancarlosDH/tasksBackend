const db = require('../database/models');

const controller = {
    list : function (req, res) {
        db.Tasks.findAll({
                where : { status : 'created' }
            }).then(tasks => {
                res.send({
                    data : tasks,
                    status : "success",
                    message : null
                });
            });
    },
    save : function (req, res) {
        db.Tasks.create({
                text : req.body.text,
                status : req.body.status,
                createdAt : new Date()
            }).then((item) => {
                res.send({
                    status : "success",
                    message: null,
                    data : item.get()
                });
            }).catch(error => {
                console.log(error);
                res.send({
                    error : {
                        code : "500",
                        message : "error trying saving the task"
                    },
                });
            });
    },
    complete : function (req, res) {

        db.Tasks.findByPk(req.params.id).then(task => {

            if (!task) {
                res.send({
                    error : {
                        code : "404",
                        message : "task not found"
                    }
                });
            }

            task.status = 'completed';
            task.updatedAt = new Date();
            task.save();

            res.send({
                status : "success",
                data : task,
                message : "task completed"
            });

        }).catch(error => {
            console.log(error);
            res.send({
                error : {
                    code : "500",
                    message : "Error while complete the task"
                }
            });
        });
    }
}

module.exports = controller;