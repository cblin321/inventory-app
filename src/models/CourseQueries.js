const pool = require("Pool")

async function getAllCoursesQuery() {
    const getAllCoursesSQL = `
        SELECT * FROM courses;
    `
    const rows = pool.query(getAllCoursesSQL)
    return rows
}

async function deleteCourseQuery(id) {
    const deleteSQL = `
        DELETE FROM courses
        WHERE id = $1
    `

    await pool.query(deleteSQL)
}

module.exports = {
    getAllCoursesQuery,
}