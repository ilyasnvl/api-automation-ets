// Tambahkan global `self` supaya tidak error di Jenkins
if (typeof self === 'undefined') {
  global.self = global;
}

// Tambahkan juga polyfill TextEncoder/TextDecoder bila diperlukan
const { TextEncoder, TextDecoder } = require('util');
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;
