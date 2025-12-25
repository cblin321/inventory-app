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
        WHERE id = $1;
    `

    await pool.query(deleteSQL)
}

async function getOneQuery(id) {
    const getOneSQL = `
        SELECT * FROM courses
        WHERE course_number = $1;
    `

    const result = (await pool.query(getOneSQL, [id])).rows
    return result
}
async function addCourseQuery(name, number) {
    const addSQL = `
        INSERT INTO courses (course_number, course_name)
        VALUES ($1, $2);
    `

    await pool.query(addSQL, [number, name])
}

async function updateCourseQuery(id, name, number) {
    const updateSQL = `
        UPDATE courses
           SET course_name = $1, course_number = $2 
        WHERE course_number = $3;
    `

    await pool.query(updateSQL, [name, number, id])
}

module.exports = {
    getAllCoursesQuery,
    getOneQuery,
    deleteCourseQuery,
    getAllCoursesQuery,
    addCourseQuery,
    updateCourseQuery,
}
