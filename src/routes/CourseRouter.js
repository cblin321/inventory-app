const { Router } = require("express")

const courseRouter = Router()

courseRouter.get("./", async (req, res) => {
        res.render("./courses")
    }
)

courseRouter.get("./course/:id/subjects", async (req, res) => {

})

courseRouter.delete("./course/:id", async (req, res) => {

})

courseRouter.post("./course/add", async (req, res) => {

})

courseRouter.put("./course/:id", async (req, res) => {

})

module.exports = courseRouter
