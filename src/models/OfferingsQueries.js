async function getOfferings(course) {
    const getOfferingsSQL = `
        SELECT * FROM offerings o
        WHERE o.course_id = $1;
    `
    const result = (await pool.query(getOfferingsSQL), course.course_id).rows
    return result
}

module.exports = {
    getOfferings
}