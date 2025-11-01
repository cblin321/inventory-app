const queries = require("../models/CourseQueries")
async function getAllCourses(req, res) {
    const getAllCoursesResult = await queries.getAllCoursesQuery()
    return getAllCoursesResult
}

async function getOne(id) {
    const getOneQuery = await queries.getOneQuery(id) 
    return getOneQuery
}

async function deleteCourse(req, res) {
    const id = req.params["id"]

}

async function addCourse(req, res) {

}

async function updateCourse(req, res) {

}

module.exports = {
    getAllCourses,
    getOne
}