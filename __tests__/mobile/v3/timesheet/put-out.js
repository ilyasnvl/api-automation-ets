const timsheetCollection = require('../../../../collections/mobile/v3/timesheet')

const fs = require('fs');
const path = require('path');
const globalVariables = path.resolve(__dirname, '../../../../config/global-variables.json');
 
const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})


let res
let idTs

beforeAll(async () => {    
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay

    const data = JSON.parse(fs.readFileSync(globalVariables, 'utf-8'));
    idTs = data.__ID_TS__

console.log("id dari tc put out: ", idTs)
})

describe("Put Timesheet Out Driver", () => {


    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result }) => {
            res = await timsheetCollection.putTimesheetOut(header, idTs, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)

            console.log("response id dari test suite", idTs)
        }
    )
})