globalVariables = require('./global-variables.json')

module.exports = async function (globalConfig, projectConfig) {
    console.log(globalConfig.testPathPattern);
    console.log(projectConfig.cache);

    //console.log(globalVariables);
};