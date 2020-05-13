const hbsParser = class hbsParser {
    constructor(options = {}) {

    }

    parse(file, packageName) {
        var contentResult = [];

        contentResult.push({
            fileType: file.fileType,
            path: file.filePath,
            value: "",
            lineNumber: "",
            packageName
        });

        return contentResult;
    }
};

module.exports = hbsParser;