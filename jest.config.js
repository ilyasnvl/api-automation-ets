/** @type {import('jest').Config} */

const config = {
    testEnvironment: 'node',
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
    globalTeardown: './config/global-teardown.js',
    testSequencer: './config/custom-sequencer.js',
};

module.exports = config;