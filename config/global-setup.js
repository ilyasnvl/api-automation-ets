const globalVariables = require('./global-variables.json')
const request = require('supertest');

module.exports = async function (globalConfig, projectConfig) {
    console.log(globalConfig.testPathPattern);
    console.log(projectConfig.cache);
}