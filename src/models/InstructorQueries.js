const pool = require("../models/Pool")
async function getOne(id) {
  const getOneSQL = `
    SELECT * FROM instructors 
      WHERE instructors_id = $1;
  `
  await pool.query(getOneSQL, [id])
}

async function getAll() {
  const getAllSQL = `
    SELECT * FROM instructors;
  `
  
  await pool.query(getAllSQL)
}

async function createOne() {
  
}

async function deleteOne(id) {
  const getOneSQL = `
    DELETE * FROM instructors 
      WHERE instructors_id = $1;
  `
  await pool.query(getOneSQL, [id])
}

async function updateOne(id, row) {
  const updateOneSQL = `
    UPDATE professors
      SET name = $1, rating = $2
      WHERE instructors_id = $3;
  `
  
  const { name, rating } = row

  await pool.query(updateOneSQL, [name, rating, id])
}

module.exports = {
  getOne,
  getAll,
  createOne,
  deleteOne,
  updateOne
}