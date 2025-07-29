const timesheetInCollection = require('../../../../collections/mobile/v3/timesheet')

const fs = require('fs');
const path = require('path');
 
const globalVariables = require('../../../../config/global-variables.json');
const { verifyResponse } = require('../../../../utilities/verifier');
const jsonPath = path.resolve(__dirname, '../../../../config/global-variables.json');
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet');
const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

// function updateGlobalVariable(newData) {
//   let existingData = {};
 
//   if (fs.existsSync(jsonPath)) {
//     const raw = fs.readFileSync(jsonPath, 'utf-8');
//     existingData = JSON.parse(raw);
//   }
 
//   const updated = { ...existingData, ...newData };
 
//   fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
// }
 
afterAll(async () => {
    res = await timesheetHelper.delTimesheet()
    return res
})

describe("Put Timesheet In Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async({ title, header, body, param, expected_result, expected_timesheet_detail }) => {
            res = await timesheetInCollection.putTimesheetIn(header, body)
            verifyResponse(res, expected_result)

            globalVariables.__ID_TS_IN__ = res.body.result.id
            console.log("id dari tc in: ",globalVariables.__ID_TS_IN__)

            res =  await timesheetInCollection.getTimesheet(header, param)
            console.log("get timesheet:\n ", JSON.stringify(res.body, null, 2))
            verifyResponse(res, expected_timesheet_detail)

            // const id = res.body.result.id;
            // updateGlobalVariable({ __ID_TS__: id });
            // console.log('ID ditambahkan ke globalVariable.json:', id);

        }
    )
})