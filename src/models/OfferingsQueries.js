const pool = require("../models/Pool")

async function getOneQuery(id) {
  const getOfferingsSQL = `
    SELECT * FROM offerings
      JOIN courses ON courses.course_number = offerings.course_number
      WHERE offering_id = $1;
  `

  return (await pool.query(getOfferingsSQL, [id])).rows;
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

async function createOneQuery(row) {
  const addOfferingSQL = `
    INSERT INTO offerings
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
  `;
  const { start, end, year, sem, cap, enrolled, course_num } = row;

  await pool.query(addOfferingSQL, [
    start,
    end,
    year,
    sem,
    cap,
    enrolled,
    course_num,
  ]);
}

async function updateOneQuery(row) {
  const { start, end, year, sem, cap, enrolled, course_number } = row
  const updateOfferingSQL = `
    UPDATE offerings 
      SET offering_time_start = $1, offering_time_end = $2,
      year = $3, semester = $4, capacity = $5, enrolled = $6
      WHERE course_number = $7;
  `;

  await pool.query(updateOfferingSQL, [ start, end, year, sem, cap, enrolled, course_number])
}

module.exports = {
  getOneQuery,
  getAllQuery,
  deleteCourseOfferingQuery,
  createOneQuery,
  updateOneQuery,
};
