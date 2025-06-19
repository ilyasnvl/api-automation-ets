const { matchers } = require('jest-json-schema');
expect.extend(matchers);

function verifyResponse(actual, expected) {
    expect(actual.statusCode, JSON.stringify(actual.body)).toEqual(expected.status_code)
    expect(actual.body, JSON.stringify(actual.body)).toMatchObject(expected.body)
    expect(actual.body, JSON.stringify(actual.body)).toMatchSchema(expected.json_schema)
}

function verifyStatusCode(actual, expected) {
    expect(actual.statusCode, JSON.stringify(actual.body)).toEqual(expected.status_code)
}

function verifyObjectExistsInsideArray(actual, expected) {
    actual.forEach((value) => {
        expect(value).toMatchObject(expected)
    })
}

function verifyObjectNotExistsInsideArray(actual, expected) {
    actual.forEach((value) => {
        expect(value).not.toMatchObject(expected)
    })
}

class grpcVerifier {
    constructor() {
    }

    verifySuccessGrpc(actual, expected) {
        expect(actual).toMatchObject(expected.body)
        expect(actual).toMatchSchema(expected.json_schema)
    }

    verifyFailGrpc(actual, expected) {
        expect(actual.details).toEqual(expected.body)
        expect(actual.code).toEqual(expected.status_code)
    }
}


module.exports = {
    verifyResponse, verifyStatusCode, verifyObjectExistsInsideArray, verifyObjectNotExistsInsideArray, grpcVerifier
};