const {User} = require('../models');

const UserController = {
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },
    getUserById(req, res) {
        User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req. body) 
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
        
    },
}