const pg = require("pg");
const { Pool } = pg;
const dotenv = require("dotenv").config();

// Configure pg to handle UUIDs
pg.types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

// const { Pool } = pkg;

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT
});

pool.on("connect", ()=>{
    console.log("Database Connected");
});

module.exports = pool;