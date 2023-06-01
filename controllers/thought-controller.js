const { Thought, User } = require('../models/index');

const ThoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
            res.json(thoughts)
        } catch(err){
            res.status(500).json(err)
        }
    },
    async getSingleThoughtById(req, res) {
        try {
            const singleThought = await Thought.findById(req.params.thoughtId)
            if (!singleThought) {
              return res.status(404).json({message:"No thought by that ID"})
            }
            res.json(singleThought)
        } catch (err) {
            res.status(500).json(err)
            
        }
    },
    async createNewThought(req, res) {
        try {
            const newThought = await Thought.create(req.body)
            const user = await User.findByIdAndUpdate(req.body.userId,
                {
                    $addToSet:{
                        thoughts: newThought._id
                    }
                },{
                    new: true
                })
            res.status(200).json({newThought, user})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThoughtById(req, res) {
        try {
            const updateThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true
            })
            res.status(200).json(updateThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeThoughtById(req, res) {
        try {
            const removeThought = await Thought.findByIdAndDelete(req.params.thoughtId)
            res.status(200).json(removeThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findByIdAndUpdate(req.params.thoughtId, 
                {
                    $addToSet: {
                        reactions: req.body
                    }
                },{
                    new: true
                })
                res.status(200).json(newReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeReaction(req, res) {
        try {
            const deleteReaction = await Thought.findByIdAndUpdate(req.params.thoughtId, 
                {
                    $pull: {
                        reactions: {
                          reactionId: req.params.reactionId  
                        }
                    }
                },{
                    new: true
                })
                res.status(200).json(deleteReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },

}

module.exports = ThoughtController