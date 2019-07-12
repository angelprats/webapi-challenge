const express = require('express');

const projectModel = require('./data/helpers/projectModel');
const actionModel = require('./data/helpers/actionModel');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Sprint, Challenge Day!!');
});

//get all projects
server.get('/projects', (req, res) => {
//get data from the database
    projectModel.get()
    .then(projects => {
        //send data to client
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ error: 'error retrieving the projects'})
    })
})


//post
server.post('/projects', (req, res) => {
    const projectInfo = req.body;

    projectModel.insert(projectInfo)
    .then(project => {
        res.status(201).json({ success: true, project });
    }) 
    .catch(err => {
        res.status(404).json({
            success: false,
            message: 'I cannot find what you are looking for'
        });
    })
})

//delete projects
server.delete('/projects/:id', (req, res) => {
    const id = req.params.id;
    projectModel.remove(id)
    .then(count => {
        if(count) {
            res.status(201).end()
        }
        else {
           res.status(404).json({ message: 'There is no project with the specified id'}) 
        }
    })
    .catch(err => res.status(500).json({ message: 'Error deleting that id'}))
})

//update
server.put('/projects/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    projectModel.update(id, changes)
    .then(update => {
        if(update) {
            res.status(200).json({ success: true, update })
        } else {
            res.status(404).json({ message: 'Something went wrong updating the project' })
        }
    })
    .catch(err => res.status(500).json({ message: 'There is no project with that id' }))
})

server.get('/projects/:id/actions', (req, res) => {
    const id = req.params.id;
    projectsModel.getProjectActions(id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(err => res.status(500).json({ message: 'having trouble getting projec action'}))
})


server.get('/actions', (req, res) => {
    actionModel.get()
    .then(actions => {
        res.status(200).json(actions)
    }) 
    .catch(err => {
        res.status(500).json({ error: 'error retrieving the actions' })
    })
})

server.post('/actions', (req, res) => {

})


module.exports = server;