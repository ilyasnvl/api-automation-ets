const path = require('path');
const Sequencer = require('@jest/test-sequencer').default;
class CustomSequencer extends Sequencer {
  sort(tests) {
    const order = [
      'put-in.js',
      'put-out.js',
      'put-additional.js',
      'get-timesheet.js',
      'put-validate.js'
    ];
    console.log('\n[Custom Sequencer] 🔍 Total test files to sort:', tests.length);
    const remainingTests = new Set(tests);
    const orderedTests = [];
    // Cek dan log semua test file yang akan diurutkan
    console.log('\n[Custom Sequencer] 📂 All test files:');
    tests.forEach((t, i) => {
      console.log(`  ${i + 1}. ${path.relative(process.cwd(), t.path)}`);
    });
    console.log('\n[Custom Sequencer] 📌 Matching files in preferred order:\n');
    order.forEach((targetFile) => {
      const matched = Array.from(remainingTests).find((test) => {
        const basename = path.basename(test.path);
        const match = basename === targetFile;
        console.log(
          `   → Matching: "${basename}" === "${targetFile}" → ${match ? '✅' : '❌'}`
        );
        return match;
      });
      if (matched) {
        orderedTests.push(matched);
        remainingTests.delete(matched);
      } else {
        console.warn(
          `⚠️  Warning: File "${targetFile}" not found in current test suite`
        );
      }
    });
    // Tambahkan sisanya ke akhir
    const remainingArray = Array.from(remainingTests);
    if (remainingArray.length > 0) {
      console.log('\n[Custom Sequencer] ➕ Remaining test files (not in order list):');
      remainingArray.forEach((t, i) =>
        console.log(`  ${i + 1}. ${path.relative(process.cwd(), t.path)}`)
      );
    }
    const finalOrder = [...orderedTests, ...remainingArray];
    // Cetak urutan akhir
    console.log('\n✅ [Custom Sequencer] Final test execution order:\n');
    finalOrder.forEach((t, i) =>
      console.log(`  ${i + 1}. ${path.relative(process.cwd(), t.path)}`)
    );
    return finalOrder;
  }
}
module.exports = CustomSequencer;