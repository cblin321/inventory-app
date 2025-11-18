const queries = require("../models/CourseQueries")
async function getAllCourses(req, res) {
    let getAllCoursesResult = await queries.getAllCoursesQuery()
    getAllCoursesResult = getAllCoursesResult.map((course) => ({
        ...course,
        offeringsURL: `../offerings/${course.course_number}`,
    }));
    return getAllCoursesResult
}

async function getOne(req, res) {
    const id = req.params.id
    const getOneQuery = await queries.getOneQuery(id) 
    return getOneQuery
}

async function deleteCourse(req, res) {
    const id = req.params["id"]
    queries.deleteCourseQuery(id)
}

async function addCourse(req, res) {
    const { course_name, course_number } = req.body
    await queries.addCourseQuery(course_name, course_number)
}

async function updateCourse(req, res) {
    const id = req.params["id"]
    const { name, number } = req.body
    queries.updateCourseQuery(id, name, number)
}

module.exports = {
    getOne,
    getAllCourses, 
    addCourse,
    updateCourse,
    deleteCourse,
}