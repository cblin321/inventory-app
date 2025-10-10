
const dropAll = `
    DROP TABLE courses_belong_to_subjects CASCADE;

    DROP TABLE professors_teach_offerings CASCADE; 

    DROP TABLE subjects CASCADE; 

    DROP TABLE offerings CASCADE; 

    DROP TABLE courses CASCADE; 

    DROP TABLE professors CASCADE;
`
const pool = require("./Pool")

async function main() {
    await pool.query(dropAll)
}

main()