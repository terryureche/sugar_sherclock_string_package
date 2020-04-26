const csvWriter = require("csv-writer").createObjectCsvWriter;
const FileReader = require("./FileReader").reader;

const csv = class CsvWriter {
    constructor(basePath, packageName, options = {}) {
        var realPath = this.preparePath(basePath, packageName);

        if (options.hasOwnProperty("path") === false) {
            options.path = realPath;
        }

        if (options.hasOwnProperty("header") === false) {
            options.header = [
                { id: "packageName", title: "Package Name" },
                { id: "path", title: "Path" },
                { id: "lineNumber", title: "Line Number" },
                { id: "value", title: "Value" },
                { id: "fileType", title: "File Extension" }];
        }

        if (options.hasOwnProperty("delimiter") === false) {
            options.delimiter = "\r\n";
        }

        if (options.hasOwnProperty("alwaysQuote") === false) {
            options.alwaysQuote = true
        }

        this.csvWriter = csvWriter(options);
    }

    preparePath(basePath, packageName) {
        const fileReader = new FileReader();
        const hostDirectory = fileReader.joinPath(basePath, packageName);

        if (fileReader.fileExist(hostDirectory) === false) {
            fileReader.mkDirSync(hostDirectory);
        }

        const fullPath = fileReader.joinPath(hostDirectory, packageName) + ".csv";

        return fullPath;
    }

    async createCsv(records) {
        await this.csvWriter.writeRecords(records);
    }
}

module.exports = {
    csv
};