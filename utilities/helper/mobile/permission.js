const { Pool } = require('pg')
const globalVariables = require('../../../config/global-variables.json')

async function delPermission() {
    const pool = new Pool({
        host: __DATABASE__.__HOST__,
        port: __DATABASE__.__PORT__,
        database: __DATABASE__.__DB_NAME2__,
        user: __DATABASE__.__USER__,
        password: __DATABASE__.__PASSWORD__
    })

    const query = `
        DELETE FROM permissions
        WHERE id = $1
        ;
    `
    const values = globalVariables.__ID_PERMISSION__
    console.log(values)
    const result = await pool.query(query, values)
    await pool.end()
    console.log("Successfully delete rows permission: ", result.rowCount)
}

module.exports = {
    delPermission
}