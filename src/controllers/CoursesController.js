const queries = require("../models/CourseQueries")
async function getAllCourses(req, res) {

    res.send(queries)
}

async function deleteCourse(req, res) {
    const id = req.params["id"]
    queries.deleteCourseQuery(id)
}

async function addCourse(req, res) {
    const { name, number } = req.body
    queries.addCourseQuery(name, number)
}

async function updateCourse(req, res) {
    const id = req.params["id"]
    const { name, number } = req.body
    queries.updateCourseQuery(id, name, number)

}

module.exports = {
    getAllCourses, 
    addCourse,
    updateCourse,
    deleteCourse,
}