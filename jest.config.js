/** @type {import('jest').Config} */

const config = {
    testEnvironment: 'node',
    testSequencer: './config/custom-sequencer.js',
    testTimeout: 30000,
    verbose: true,
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    reporters: [
        "default",
        "jest-html-reporters"
    ],
    setupFilesAfterEnv: [
        "jest-expect-message"
    ],
    globals: require('./config/global-variables.json'),
    globalSetup: './config/global-setup.js',
    globalTeardown: './config/global-teardown.js'
};

module.exports = config;