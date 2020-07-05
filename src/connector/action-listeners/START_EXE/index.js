const child = require('child_process').execFile;
const { app } = require('electron')

module.exports = async () => child('Wow.exe');