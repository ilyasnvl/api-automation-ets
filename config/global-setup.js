globalVariables = require('./global-variables.json')

module.exports = async function (globalConfig, projectConfig) {
    console.log(globalConfig.testPathPattern);
    console.log(projectConfig.cache);

    console.log(globalVariables);
    globalVariables.__EXAMPLE_TOKEN__ = token()
};

function rand() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

function token() {
    return rand() + rand() + rand(); // to make it longer
};