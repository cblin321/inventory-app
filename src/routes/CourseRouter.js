const { Router } = require("express")

const courseRouter = Router()
const coursesController = require("../controllers/CoursesController")

courseRouter.get("/", async (req, res) => {
        const allCourses = await coursesController.getAllCourses()
        // console.log(allCourses)
        res.render("./courses", { courses: allCourses })
        // res.send(allCourses)
    }
)

courseRouter.get("/:id", async (req, res) => {
    const params = req.params

    let result = await coursesController.getOne(parseInt(params.id))
    result = await coursesController.getOfferings(result[0]) 
    return result
})

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
