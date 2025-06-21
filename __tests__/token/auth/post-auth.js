const authCollection = require('../../../collections/token/auth')
const { title, body, expected_result } = require('../../../test-data/token/auth/post-auth/P, succesfullly post auth')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

describe("Post Auth Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result }) => {
            res = await authCollection.postAuth(header, body);
            expect(res.statusCode).toEqual(expected_result.status_code);
            expect(res.body).toMatchObject(expected_result.body);
        }
    )
})