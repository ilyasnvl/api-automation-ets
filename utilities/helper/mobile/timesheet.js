const { Pool } = require('pg')
const globalVariables = require('../../../config/global-variables.json')

async function delTimesheet() {
    const pool = new Pool({
        host: __DATABASE__.__HOST__,
        port: __DATABASE__.__PORT__,
        database: __DATABASE__.__DB_NAME__,
        user: __DATABASE__.__USER__,
        password: __DATABASE__.__PASSWORD__
    })

    const query = `
        DELETE FROM master_timesheets
        WHERE id in ($1, $2, $3)
        ;
    `
    const values = [
        globalVariables.__ID_TS_IN__, 
        globalVariables.__ID_TS_OUT__,
        globalVariables.__ID_TS_ADDITIONAL__
    ]
    console.log(values)
    const result = await pool.query(query, values)
    await pool.end()
    console.log("successfully deleted rows: ", result.rowCount)
}

module.exports = {
    delTimesheet
}