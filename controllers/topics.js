const Topic = require('../models/topic');

module.exports = {
    createTopic,
    search,
    deleteTopic,
    getAllTopics,
    getUserTopics
}

async function createTopic(req, res){
    try {
        console.log(req.body)
        await Topic.create({
            title: req.body.title,
            description: req.body.description,
            user: req.body.user,
            icon: req.body.icon
        });
        res.status(201).json({data: 'Topic Created'})
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function search(req, res){
    try {
        const searchList = await Topic.find({});
        const keyword = req.params.keyword.toLowerCase();
        let topics = [];
        searchList.forEach(function(topic) { 
            let topicTitle = topic.title.toLowerCase();
            if (topicTitle.includes(keyword)) {
                topics.push(topic);
                topics.sort();
            }
        })
        res.status(200).json( topics )
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function deleteTopic(req, res){
    try {
        const topic = await Topic.findById(req.params.id);
        
        topic.remove();
        await topic.save();
        res.json({data: 'topic removed'})
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function getAllTopics(req, res){
    try {
        const topics = await Topic.find({});
        res.status(200).json( topics )
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function getUserTopics(req, res){
    try {
        const topics = await Topic.find({user: req.params.id});
        res.status(200).json( topics )
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

