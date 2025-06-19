const { v4: uuidv4 } = require('uuid');
const path = require('path');

function generateRandomIntegersInLength(length) {
    let add = 1;
    let max = 12 - add;
    // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

    let randomNumbers;
    if (length > max) {
        length = max;
    }
    max = Math.pow(10, length + add);
    let min = max / 10; // Math.pow(10, n) basically
    let number = Math.floor(Math.random() * (max - min + 1)) + min;

    randomNumbers = ("" + number).substring(add);
    return randomNumbers;
}

function generateRandomIntegersInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomStringInLength(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

function formatDateISO(date, gmtOffset) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    let offsetSign = gmtOffset >= 0 ? '+' : '-';
    let offsetHours = Math.abs(gmtOffset).toString().padStart(2, '0');
    let offsetMinutes = '00'; // Fixed to 00 for GMT offsets

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

function ensureFutureDate(date, gmtOffset) {
    let timeZone = `Etc/GMT-${gmtOffset}`;
    let options = { timeZone: timeZone };
    let currentDate = new Date();
    currentDate.toLocaleString('en-US', options);

    if (date < currentDate) {
        date.setDate(date.getDate() + 1);
    }
}

function generateDateTime(subsetHours = 0, gmtOffset = 7) {
    let timeZone = `Etc/GMT-${gmtOffset}`;
    let options = { timeZone: timeZone };
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + subsetHours);
    currentDate.toLocaleString('en-US', options);

    return formatDateISO(currentDate, gmtOffset)
}

function generateDateTimeWithinTimeframe(startHour, endHour, gmtOffset = 7) {
    let date = new Date();
    let randomHour;

    if (startHour > endHour) { // Timeframe spans midnight
        randomHour = Math.random() < 0.5
            ? generateRandomIntegersInRange(startHour, 23) // 22:00 - 23:59
            : generateRandomIntegersInRange(0, endHour - 1); // 00:00 - 05:59
    } else { // Normal timeframe
        randomHour = generateRandomIntegersInRange(startHour, endHour - 1);
    }
    let randomMinute = generateRandomIntegersInRange(0, 59);
    let randomSecond = generateRandomIntegersInRange(0, 59);

    date.setHours(randomHour, randomMinute, randomSecond, 0);
    ensureFutureDate(date, gmtOffset);

    return formatDateISO(date, gmtOffset);
}

function generateDateTimeOutsideTimeframe(startHour, endHour, gmtOffset = 7) {
    let date = new Date();
    let randomHour;

    if (startHour > endHour) { // Timeframe spans midnight — outside is between endHour and startHour
        randomHour = generateRandomIntegersInRange(endHour, startHour - 1);
    } else { // Normal timeframe — outside is before startHour or after endHour
        randomHour = Math.random() < 0.5
            ? generateRandomIntegersInRange(0, startHour - 1) // Before startHour
            : generateRandomIntegersInRange(endHour, 23); // After endHour
    }
    let randomMinute = generateRandomIntegersInRange(0, 59);
    let randomSecond = generateRandomIntegersInRange(0, 59);

    date.setHours(randomHour, randomMinute, randomSecond, 0);
    ensureFutureDate(date, gmtOffset);

    return formatDateISO(date, gmtOffset);
}

function isNowWithinTimeframe(startHour, endHour, gmtOffset = 7) {
    let timeZone = `Etc/GMT-${gmtOffset}`;
    let options = { timeZone: timeZone };
    let currentDate = new Date();
    currentDate.toLocaleString('en-US', options);

    let hours = currentDate.getHours();
    if (startHour > endHour) {
        return hours >= startHour || hours < endHour;
    } else {
        return hours >= startHour && hours < endHour;
    }
}

function formatDateStringToUtc(dateString) {
    let originalDateString = dateString;
    let originalDate = new Date(originalDateString);
    let convertedDateString = originalDate.toISOString();
    let formattedDateString = convertedDateString.slice(0, 19) + "Z";
    return formattedDateString
}

function generateUuid() {
    return uuidv4();
}

function createScenarioName(fileName) {
    let scriptName = path.basename(fileName).split('.')[0];
    return scriptName.replaceAll('-', ' ').replaceAll('_', ' - ').toUpperCase();
}

module.exports = {
    generateRandomIntegersInLength, generateRandomStringInLength, generateRandomIntegersInRange,
    generateDateTime, generateDateTimeWithinTimeframe, generateDateTimeOutsideTimeframe, isNowWithinTimeframe,
    generateUuid, formatDateStringToUtc, createScenarioName
}

