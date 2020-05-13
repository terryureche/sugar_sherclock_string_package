const path = require("path");
const currentPath = path.join(__dirname, "../");
const targetFolder = "Target";
const scanTarget = path.join(currentPath, targetFolder);
const allowedExtensionsRegex = /[^.]*?\.+(js$|php$|hbs$)/;
// const searchStringDoubleQuoteRegex = /"((?:\\.|[^"\\])*)"/g;
const searchStringDoubleQuoteRegex = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g; //not used
const ignoreDirectories = [
    "archive",
    "docs",
    ".git"
];

const filesToIgnore = [
    "manifest.php"
];

const keywordsToIgnore = [
    "'Not A Valid Entry Point'",
    "View",
    "view",
    "base",
    "'shortHelp'",
    "'longHelp'",
    "'pathVars'",
    "'POST'",
    "'GET'",
    "'method'",
    "'path'",
    "'reqType'",
    "Record",
    "Create",
    "app:sync:complete",
    "insert",
    "'disable_row_level_security'"
];

const basePathForExportingCsv = path.join(currentPath, "Output")

module.exports = {
    keywordsToIgnore,
    filesToIgnore,
    scanTarget,
    allowedExtensionsRegex,
    searchStringDoubleQuoteRegex,
    basePathForExportingCsv
}
