const { Pool } = require('pg')

async function getTimesheet() {
    const pool = new Pool({
        host: __DATABASE__.__HOST__,
        port: __DATABASE__.__PORT__,
        database: __DATABASE__.__DB_NAME__,
        user: __DATABASE__.__USER__,
        password: __DATABASE__.__PASSWORD__
    })

    const query = `
        SELECT id, driver_nip, driver_name
        FROM master_timesheets
        WHERE id = $1
        AND period = '2025-07'
        ;
    `
    const values = [__ID_TS__]
    console.log(values)
    const result = await pool.query(query, values)
    await pool.end()
    console.log("query result: ", result)
}

module.exports = {
    getTimesheet
}