var reg = /^LAN_TYPE\=/g;
const goalFilePath = process.argv.length < 3 ? 'src' : process.argv[2].replace(reg, '');
module.exports = goalFilePath;