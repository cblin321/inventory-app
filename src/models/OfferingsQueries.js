const pool = require("../models/Pool")

async function getOneQuery(id) {
  const getOfferingsSQL = `
    SELECT * FROM offerings
      JOIN courses ON courses.course_number = offerings.course_number
      WHERE offering_id = $1;
  `

  return (await pool.query(getOfferingsSQL, [id])).rows;
}

async function getAllForCourse(cid) {
  const getCourseOfferingsSQL = `
    SELECT * FROM offerings
    WHERE course_number = $1;
  ` 

  return (await pool.query(getCourseOfferingsSQL, [cid])).rows
}

async function getAllQuery() {
  const getAllSQL = `
    SELECT * FROM offerings;
  `;

  return (await pool.query(getAllSQL)).rows;
}

async function deleteCourseOfferingQuery(id) {
  const deleteOfferingsSQL = `
    DELETE FROM offerings 
      WHERE offerings.offering_id = $1; 
      `;
  
  const deleteRelationSQL = `
    DELETE FROM professors_teach_offerings
      WHERE offering_id = $1;
  `;


  await pool.query(deleteRelationSQL, [id]);
  await pool.query(deleteOfferingsSQL, [id]);
}

async function createOneQuery(row, id) {
  const addOfferingSQL = `
    INSERT INTO offerings (
      offering_time_start,
        offering_time_end,
        year,
        semester,
        capacity,
        num_enrolled,
        course_number
    )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
  `;
  const { start, end, year, sem, cap, num_enrolled } = row;

  const result = await pool.query(addOfferingSQL, [
    start,
    end,
    year,
    sem,
    cap,
    num_enrolled,
    id
  ]);


  return result
}

async function updateOneQuery(body, old_id) {
  const { start, end, year, sem, cap, num_enrolled, course_number } = body
  const updateOfferingSQL = `
    UPDATE offerings 
      SET offering_time_start = $1, offering_time_end = $2,
      year = $3, semester = $4, capacity = $5, num_enrolled = $6, course_number = $7
      WHERE offering_id = $8;
  `;

  await pool.query(updateOfferingSQL, [ start, end, year, sem, cap, num_enrolled, course_number, old_id])
}

module.exports = {
  getOneQuery,
  getAllQuery,
  deleteCourseOfferingQuery,
  createOneQuery,
  updateOneQuery,
  getAllForCourse
};
