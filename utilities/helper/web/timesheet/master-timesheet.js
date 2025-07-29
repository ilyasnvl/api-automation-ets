const request = require('supertest');
const { header, param } = require('../../../../test-data/web/timesheet/master-timesheet/get-master-timesheet/P, succesfully get master ts op');
const globalVariables = require('../../../../config/global-variables.json')

const baseUrl = globalVariables.__BASE_URL__;

async function getMasterTimesheet() {
    const res = await request(baseUrl)
    .get('/timesheet/v2/master-timesheet')
    .set(header)
    .query(param)

    console.log("res getmasterts from helper: ", res.body)
    return res.body
}

module.exports = {
    getMasterTimesheet
}