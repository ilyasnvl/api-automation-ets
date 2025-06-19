/**
 * Jest tests sequencer
 *
 * Runs our tests in alphabetical order by directory / filename.
 *
 * @link https://jestjs.io/docs/next/configuration#testsequencer-string
 */

const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
	sort( tests ) {
		const copyTests = Array.from( tests );
		return copyTests.sort( ( testA, testB ) => ( testA.path > testB.path ? 1 : -1 ) );
	}
}

module.exports = CustomSequencer;
