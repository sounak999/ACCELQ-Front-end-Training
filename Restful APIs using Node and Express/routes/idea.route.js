const ideaController = require("../controllers/idea.controller")


/**
 * Define routes for the calls like
 * 
 * GET 127:0:0:1:8080/ideaApp/v1/ideas
 */

module.exports = (app) => {
    // GET
    app.get("/ideaApp/v1/ideas", ideaController.fetchAllIdeas)

    // POST
    app.post("/ideaApp/v1/ideas", ideaController.createNewIdea)

    // PUT
    app.put("/ideaApp/v1/ideas/:id", ideaController.updateIdea)

    // DELETE
    app.delete("/ideaApp/v1/ideas/:id", ideaController.deleteIdea)
}