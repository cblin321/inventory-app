const { Router } = require("express")

const courseRouter = Router()
const coursesController = require("../controllers/CoursesController")

courseRouter.get("./", async (req, res) => {
        const allCourses = await coursesController.getAllCourses()
        res.render("./courses", allCourses)
    }
)

courseRouter.get("./course/:id/subjects", async (req, res) => {

})

courseRouter.delete("./course/:id", async (req, res) => {
    coursesController.deleteCourse(req, res)

})

courseRouter.post("./course/add", async (req, res) => {
    coursesController.addCourse(req, res)

})

courseRouter.put("./course/:id", async (req, res) => {
    coursesController.updateCourse(req, res)
})


module.exports = courseRouter
