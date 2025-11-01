const pool = require("./Pool")

async function getAllCoursesQuery() {
    const getAllCoursesSQL = `
        SELECT * FROM courses;
    `
    const queryRes = await pool.query(getAllCoursesSQL)
    return queryRes.rows
}

async function deleteCourseQuery(id) {
    const deleteSQL = `
        DELETE FROM courses
        WHERE id = $1
    `

    await pool.query(deleteSQL)
}

async function getOneQuery(id) {
    const getOneSQL = `
        SELECT * FROM courses
        WHERE course_id = $1;
    `

    const result = (await pool.query(getOneSQL, [id])).rows
    return result
}

module.exports = {
    getAllCoursesQuery,
    getOneQuery,
    getOfferings
}