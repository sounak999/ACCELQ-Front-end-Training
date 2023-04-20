const ideas = require("../models/idea.model")

/**
* Search all ideas
 */
exports.fetchAllIdeas = (req, res) => {
    res.status(200).send(ideas)
}


/**
 * Create new idea
 */
let idCount = 1
exports.createNewIdea = (req, res) => {

    // read the request body
    const idea = req.body;

    // need to generate the next idea id
    idea.id = ++idCount

    // save it in the list of existing idea
    ideas[idCount] = idea

    // return the response
    res.status(201).send(ideas[idCount])
}


/**
 * Update idea
 */
exports.updateIdea = (req, res) => {

    // Read the ID passed in the path
    // 127.0.0.1:8080/ideaApp/v1/ideas/1
    const ideaID = req.params.id;

    // if id present, modify; else return error
    if (ideas[ideaID]) {
        ideas[ideaID] = req.body
        res.status(200).send(ideas[ideaID])
    } else {
        res.status(400).send({
            message: "idea ID passed was not correct!"
        })
    }
}

/**
 * Delete idea
 */

exports.deleteIdea = (req, res) => {
    // Check if present - yes delete, no return error message

    if (ideas[req.params.id]) {
        delete ideas[req.params.id];
        res.status(200).send({
            message: "Successfully deleted"
        })
    } else {
        res.status(400).send({
            message: "Wrong Idea id"
        })
    }
}