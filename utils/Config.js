const path = require("path");
const currentPath = path.join(__dirname, "../");
const targetFolder = "Target";
const scanTarget = path.join(currentPath, targetFolder);
const allowedExtensionsRegex = /[^.]*?\.+(js$|php$)/;
// const searchStringDoubleQuoteRegex = /"((?:\\.|[^"\\])*)"/g;
const searchStringDoubleQuoteRegex = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g; //not used
const ignoreDirectories = [
    "archive",
    "docs",
    ".git"
];
const basePathForExportingCsv = path.join(currentPath, "Output")

module.exports = {
    scanTarget,
    allowedExtensionsRegex,
    searchStringDoubleQuoteRegex,
    basePathForExportingCsv
}
