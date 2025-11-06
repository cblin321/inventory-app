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
        WHERE course_id = $1;
    `

    const result = (await pool.query(getOneSQL, [id])).rows
    return result
}
async function addCourseQuery(name, number) {
    const addSQL = `
        INSERT INTO courses 
        VALUES ($1, $2);
    `

    await pool.query(addSQL, [number, name])
}

async function updateCourseQuery(id, name, number) {
    const updateSQL = `
        UPDATE courses
           SET name = $1, number = $2 
        WHERE course_id = $3;
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