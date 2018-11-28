var outPut;
var reg = /^LAN_TYPE\=/g;
var args = process.argv[2].replace(reg, '');
switch (args) {
    case "src":
        outPut = 'zh_CN'
        break;
    case "en":
        outPut = 'en_US'
        break;
    case "tw":
        outPut = 'zh_TW'
        break;
    default:
        outPut = 'zh_CN'
        break;
}
module.exports = outPut;
